import { NearBindgen, near, call, view, initialize } from "near-sdk-js";
import { User, ExperienceLevel, Course, CourseProgress } from "./types";

const users = new Map<string, User>();
const courses = new Map<string, Course>();
const progress = new Map<string, CourseProgress[]>();

function panic(msg: string): never {
  near.panicUtf8(new TextEncoder().encode(msg));
}

@NearBindgen({})
class Contract {
  @initialize({})
  @call({})
  register_user({ id }: { id: string }) {
    if (users.get(id)) panic("User already exists");

    users.set(id, {
      id,
      experienceLevel: null,
      enrolledCourses: [],
      earnedTokens: 0,
    });
  }

  @call({})
  set_experience_level({ id, level }: { id: string; level: ExperienceLevel }) {
    const user = users.get(id);
    if (!user) panic("User already exists");
    user.experienceLevel = level;
    users.set(id, user);
  }

  @call({})
  enroll_course({ id, courseId }: { id: string; courseId: string }) {
    const user = users.get(id);
    const course = courses.get(courseId);
    if (!user || !course) panic("Invalid user or course");
    user.enrolledCourses.push(courseId);
    users.set(id, user);

    progress.set(id, [
      ...(progress.get(id) || []),
      {
        courseId,
        sections: course.sections.map((s) => ({
          sectionId: s,
          completed: false,
        })),
      },
    ]);
  }

  @call({})
  complete_section({
    id,
    courseId,
    sectionId,
  }: {
    id: string;
    courseId: string;
    sectionId: string;
  }) {
    const userProgress = progress.get(id);
    if (!userProgress) panic("Progress not found");

    const courseData = userProgress.find((c) => c.courseId === courseId);
    if (!courseData) panic("Course progress not found");

    const section = courseData.sections.find((s) => s.sectionId === sectionId);
    if (!section) panic("Section not found");
    
    section.completed = true;
    progress.set(id, userProgress);
  }

  // called by a backend service (bot)
  @call({})
  reward_user({ id, amount }: { id: string; amount: number }) {
    const user = users.get(id);
    if (!user) panic("User not found");
    user.earnedTokens += amount;
    users.set(id, user);
  }

  @view({})
  get_user({ id }: { id: string }): User | null {
    return users.get(id);
  }
}

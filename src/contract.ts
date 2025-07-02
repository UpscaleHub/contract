import { NearBindgen, near, call, view } from "near-sdk-js";

type User = {
  experienceLevel: "beginner" | "intermediate" | "advanced";
  recommendedCourses: string[];
  swapPreference: {
    threshold?: string; // in NEAR (or yoctoNEAR)
    percentage?: number; // 0–100
  };
};

@NearBindgen({})
class Upscale {
  users: User[];
  constructor() {
    this.users = [];
  }

  @call({})
  set_swap_preference({ swapPreference }: Pick<User, "swapPreference">) {
    const { threshold, percentage } = swapPreference;
    const accountId = near.predecessorAccountId();

    this.users[accountId].swapPreference = { threshold, percentage };
    near.log(`Stored preference for ${accountId}`);
  }

  @call({})
  set_learning_info(
    info: Pick<User, "experienceLevel" | "recommendedCourses">
  ) {
    const accountId = near.predecessorAccountId();

    this.users[accountId] = {
      ...this.users[accountId],
      ...info,
    };
    near.log(`Stored info for ${accountId}`);
  }

  @view({})
  get_info({ accountId }: { accountId: string }) {
    return this.users[accountId] || null;
  }
}

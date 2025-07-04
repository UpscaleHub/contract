# 📚 Upscale Smart Contract (NEAR Protocol)

This smart contract powers the core logic for **Upscale**, a Web3-based learning and certification platform. It manages user registration, course enrollment, progress tracking, and token rewards using the NEAR blockchain.

---

## ⚙️ Exposed Methods

### 🔹 @call Methods (State-changing)
- `register_user({ id })` — Register a new user.
- `set_experience_level({ id, level })` — Set the user's experience level (`beginner`, `intermediate`, `advanced`).
- `enroll_course({ id, courseId })` — Enroll a user into a course.
- `complete_section({ id, courseId, sectionId })` — Mark a section of a course as completed.
- `reward_user({ id, amount })` — Add tokens to a user’s reward balance.

### 🔹 @view Methods (Read-only)
- `get_user({ id })` — Get full user details (experience level, tokens, enrolled courses).

---

## 🚀 Quickstart

### ✅ 1. Requirements
- Node.js ≥ 16
- NEAR CLI:  
  ```bash
  npm install -g near-cli

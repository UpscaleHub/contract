# 🧠 Upscale - Smart Contracts (NEAR Protocol)

This repository contains the smart contract logic for **Upscale**, a Web3-powered learning and hiring platform that certifies user skills and rewards learners using the NEAR Protocol.

These contracts are written in **JavaScript** using the [`near-sdk-js`](https://github.com/near/near-sdk-js) and deployed on the **NEAR testnet**.

---

## 📦 Getting Started

### 1. 📁 Clone and Install

```bash
git clone https://github.com/UpscaleHub/contract
cd contract
npm install
```

### 2. 🛠 Build the Smart Contract
```bash 
npm run build
```
This compiles your contract to WebAssembly (.wasm) and places the build in the build/ directory.

### 3. 🔄 Deploy to NEAR Testnet
```bash
near deploy --accountId <your-account>.testnet --wasmFile build/contract.wasm
```
Replace <your-account>.testnet with the NEAR testnet account you want to deploy to.

### 📚 Contract Overview
The contract handles:

👤 User registration

🧠 Experience level assignment

🎓 Course enrollment

✅ Section completion tracking

🏆 Rewarding tokens

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

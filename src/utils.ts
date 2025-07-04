import { near } from "near-sdk-js";
import { panicUtf8 } from "near-sdk-js/lib/api";

export function onlySelf(): void {
  if (near.predecessorAccountId() !== near.currentAccountId()) {
    // near.panicUtf8("Unauthorized call");
  }
}

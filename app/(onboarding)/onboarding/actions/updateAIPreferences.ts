"use server";

import { incrementOnboardingStep } from "./incrementOnboardingStep";

export async function updateAIPreferences() {
  "use server";

  await incrementOnboardingStep();
}

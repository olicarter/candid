"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateOnboardingStep } from "./updateOnboardingStep";

export async function updateBillingDetails() {
  "use server";

  const formData = new FormData();
  formData.append("step", "");
  await updateOnboardingStep(formData);

  revalidatePath("/onboarding");
  redirect("/");
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getProfile } from "@/lib/auth";

export async function incrementOnboardingStep() {
  "use server";

  const profile = await getProfile();

  if (!profile) throw new Error("Profile not found");

  if (profile.onboarding_step === null) {
    throw new Error(
      "Cannot decrement onboarding step when onboarding step is null",
    );
  }

  const supabase = createClient();

  const { error } = await supabase.from("profiles").update({
    onboarding_step: profile.onboarding_step + 1,
  }).eq("id", profile.id);

  if (error) throw error;

  revalidatePath("/onboarding");
}

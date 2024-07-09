"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/lib/auth";

export async function updateOnboardingStep(formData: FormData) {
  "use server";

  const user = await getUser();

  if (!user) throw new Error("User not found");

  const supabase = createClient();

  const { error } = await supabase.from("profiles").update({
    onboarding_step: Number(formData.get("step")),
  }).eq("id", user.id);

  if (error) throw error;

  revalidatePath("/onboarding");
}

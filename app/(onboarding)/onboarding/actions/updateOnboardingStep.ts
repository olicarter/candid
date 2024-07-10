"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/lib/auth";

export async function updateOnboardingStep(formData: FormData) {
  "use server";

  const user = await getUser();

  if (!user) throw new Error("User not found");

  const supabase = createClient();

  let step = formData.get("step") as string;

  const { error } = await supabase.from("profiles").update({
    onboarding_step: step === "" ? null : Number(step),
  }).eq("id", user.id);

  if (error) throw error;

  revalidatePath("/onboarding");
}

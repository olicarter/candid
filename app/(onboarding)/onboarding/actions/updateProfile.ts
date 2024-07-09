"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData: FormData) {
  "use server";

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { error } = await supabase.from("profiles").update({
    avatar_url: formData.get("avatar_url") as string,
    full_name: formData.get("full_name") as string,
    job_title: formData.get("job_title") as string,
    onboarding_step: 1,
  }).eq("id", user.id);

  if (error) throw error;

  revalidatePath("/onboarding");
}

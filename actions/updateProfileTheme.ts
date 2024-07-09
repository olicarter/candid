"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { type Enums } from "@/types/supabase";

export async function updateProfileTheme(formData: FormData) {
  "use server";

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { error } = await supabase.from("profiles").update({
    theme: formData.get("theme") as Enums<"theme">,
  }).eq("id", user.id);

  if (error) throw error;

  revalidatePath("/settings");
}

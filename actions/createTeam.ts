"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function createTeam(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const { data: organization } = await supabase.from("organizations").select(
    "*, members:profiles!organizations_members(*)",
  )
    .eq("members.id", user.id).single();
  if (!organization) throw new Error("Organization not found");
  const { error } = await supabase.from("teams").insert({
    organization: organization.id,
    name: formData.get("name") as string,
  });
  if (error) throw error;
  revalidatePath("/settings");
}

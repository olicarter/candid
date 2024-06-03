"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadFile(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const avatar = formData.get("avatar") as File;
  const extension = avatar.name.split(".").pop();
  const path = `${user.id}.${extension}`;
  const { error } = await supabase.storage.from("avatars").upload(
    path,
    avatar,
  );
  if (error?.statusCode === "409") {
    // Handle conflict
    await supabase.storage.from("avatars").update(path, avatar);
  }
  // Handle success
  await supabase.from("profiles").update({
    avatar_url: path,
  }).eq("id", user.id);
}

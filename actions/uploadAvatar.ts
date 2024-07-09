"use server";

import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function uploadAvatar(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const avatar = formData.get("avatar") as File;
  const extension = avatar.name.split(".").pop();
  const path = `${user.id}/${uuidv4()}.${extension}`;
  const { error: uploadError } = await supabase.storage.from("avatars").upload(
    path,
    avatar,
  );
  if (uploadError) throw uploadError;
  return path;
}

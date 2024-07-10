"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  "use server";
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.APP_URL}/auth/callback`,
    },
  });
  if (data.url) redirect(data.url);
  if (error) redirect("/login?message=Could not authenticate user");
}

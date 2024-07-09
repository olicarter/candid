"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  "use server";
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/auth/callback`
        : "http://localhost:3001/auth/callback",
    },
  });
  if (data.url) redirect(data.url);
  if (error) redirect("/login?message=Could not authenticate user");
}

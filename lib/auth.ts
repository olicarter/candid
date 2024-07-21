import { jwtDecode, type JwtPayload } from "jwt-decode";
import { createClient } from "@/utils/supabase/server";
import { type Enums } from "@/types/supabase";

interface JWT extends JwtPayload {
  user_role: Enums<"role"> | null;
}

export async function getUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getProfile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error: getProfileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (getProfileError) throw getProfileError;

  return profile;
}

export async function getUserRole() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const jwt = session ? jwtDecode<JWT>(session.access_token) : null;

  return jwt?.user_role ?? null;
}

export async function getOrganization() {
  const profile = await getProfile();

  if (!profile?.organization) return null;

  const supabase = createClient();

  const { data: organization, error } = await supabase
    .from("organizations")
    .select()
    .eq("id", profile.organization)
    .single();

  if (error) {
    console.error("getOrganization error");
    throw error;
  }

  return organization;
}

export async function getOrganizationMembers(
  options?: { includeSelf: boolean },
) {
  const profile = await getProfile();

  if (!profile?.organization) return null;

  const supabase = createClient();

  const query = supabase.from("profiles").select().eq(
    "organization",
    profile.organization,
  );

  if (!options?.includeSelf) {
    query.neq("id", profile.id);
  }

  const { data: profiles, error } = await query;

  if (error) {
    console.error("getOrganizationMembers error");
    throw error;
  }

  return profiles;
}

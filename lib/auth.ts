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

export async function getUserRole() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const jwt = session ? jwtDecode<JWT>(session.access_token) : null;

  return jwt?.user_role ?? null;
}

export async function getOrganization() {
  const supabase = createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("getUser error");
    throw getUserError;
  }

  const { data: organizations, error: getOrganizationsError } = await supabase
    .from("organizations")
    .select(
      "*, members:organizations_members!inner(profile)",
    )
    .eq("members.profile", user.id)
    .limit(1);

  if (getOrganizationsError) {
    console.error("getOrganization error");
    throw getOrganizationsError;
  }

  return organizations[0];
}

export async function getOrganizationMembers() {
  const supabase = createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("getUser error");
    throw getUserError;
  }

  const { data: profile, error: getProfileError } = await supabase
    .from("profiles")
    .select(
      "*, members:organizations_members!organizations_members_profile_fkey(*, organization(*, members:organizations_members(profile(*,profiles_roles(role)))))",
    )
    .eq("id", user.id)
    .single();

  if (getProfileError) {
    console.error("getOrganizationMembers error");
    throw getProfileError;
  }

  return profile.members[0].organization.members;
}

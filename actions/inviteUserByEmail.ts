"use server";

import { createClient as createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { Enums } from "@/types/supabase";
import { getOrganization } from "@/lib/auth";

export async function inviteUserByEmail(formData: FormData) {
  "use server";

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const organization = await getOrganization();

  if (!organization) throw new Error("Organization not found");

  const supabaseAdmin = createAdminClient();

  const { data: inviteUserByEmailData, error: inviteUserByEmailError } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(
      formData.get("email") as string,
      { data: { user_role: formData.get("role") as string } },
    );

  if (inviteUserByEmailError) throw inviteUserByEmailError;

  const { error: insertOrganizationMemberError } = await supabase
    .from("organizations_members")
    .insert({
      organization: organization.id,
      profile: inviteUserByEmailData.user.id,
    });

  if (insertOrganizationMemberError) throw insertOrganizationMemberError;

  const { error: insertProfileRoleError } = await supabase
    .from("profiles_roles")
    .insert({
      profile: inviteUserByEmailData.user.id,
      role: formData.get("role") as Enums<"role">,
    });

  if (insertProfileRoleError) throw insertProfileRoleError;
}

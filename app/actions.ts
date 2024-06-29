"use server";

import { revalidatePath } from "next/cache";
import { createClient as createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import getStripe from "@/utils/stripe";
import { getCustomer } from "@/lib/stripe";
import { Enums } from "@/types/supabase";
import { getOrganization } from "@/lib/auth";

export async function createOrganization(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const { data: organization, error: createOrganizationError } = await supabase
    .from(
      "organizations",
    ).insert({
      name: formData.get("organizationName") as string,
    }).select().single();
  if (createOrganizationError) {
    console.error("Create organization error");
    throw createOrganizationError;
  }
  const { error: createOrganizationMemberError } = await supabase.from(
    "organizations_members",
  ).insert({
    organization: organization.id,
    profile: user.id,
  });
  if (createOrganizationMemberError) {
    console.error("Create organization member error");
    throw createOrganizationMemberError;
  }
  const stripe = getStripe();
  const customer = await stripe.customers.create({
    name: organization.name,
    metadata: { organization_id: organization.id },
  });
  await supabase.from("organizations").update({
    stripe_customer_id: customer.id,
  }).eq("id", organization.id);
  redirect("/subscriptions/new");
}

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

export async function inviteUserByEmail(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const organization = await getOrganization();
  const supabaseAdmin = createAdminClient();
  const { data: inviteUserByEmailData, error: inviteUserByEmailError } =
    await supabaseAdmin.auth.admin
      .inviteUserByEmail(
        formData.get("email") as string,
        { data: { user_role: formData.get("role") as string } },
      );
  if (inviteUserByEmailError) throw inviteUserByEmailError;
  const { error: insertOrganizationMemberError } = await supabase.from(
    "organizations_members",
  ).insert({
    organization: organization.id,
    profile: inviteUserByEmailData.user.id,
  });
  if (insertOrganizationMemberError) throw insertOrganizationMemberError;
  const { error: insertProfileRoleError } = await supabase.from(
    "profiles_roles",
  ).insert({
    profile: inviteUserByEmailData.user.id,
    role: formData.get("role") as Enums<"role">,
  });
  if (insertProfileRoleError) throw insertProfileRoleError;
}

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

export async function signOut() {
  "use server";
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateOrganization(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const organizationId = formData.get("organization_id") as string;
  const stripeCustomerId = formData.get("stripe_customer_id") as string;
  const supabase = createClient();
  const { error: updateOrganizationError } = await supabase
    .from("organizations").update({ name }).eq("id", organizationId);
  if (updateOrganizationError) throw updateOrganizationError;
  const stripe = getStripe();
  try {
    await stripe.customers.update(stripeCustomerId, { name });
  } catch (updateStripeCustomerError) {
    throw updateStripeCustomerError;
  }
  revalidatePath("/settings");
}

export async function updateProfile(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const { error } = await supabase.from("profiles").update({
    full_name: formData.get("full_name") as string,
  }).eq("id", user.id);
  if (error) throw error;
  revalidatePath("/settings");
}

export async function updateStripeCustomer(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const stripeCustomer = await getCustomer();
  if (!stripeCustomer) throw new Error("Stripe customer not found");
  const stripe = getStripe();
  try {
    await stripe.customers.update(stripeCustomer.id, {
      address: {
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        line1: formData.get("line1") as string,
        line2: formData.get("line2") as string,
        postal_code: formData.get("postal_code") as string,
        state: formData.get("state") as string,
      },
    });
  } catch (updateStripeCustomerError) {
    throw updateStripeCustomerError;
  }
  revalidatePath("/settings");
}

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
  // @ts-ignore
  if (error?.statusCode === "409") {
    // Handle conflict
    await supabase.storage.from("avatars").update(path, avatar);
  }
  // Handle success
  await supabase.from("profiles").update({
    avatar_url: path,
  }).eq("id", user.id);
}

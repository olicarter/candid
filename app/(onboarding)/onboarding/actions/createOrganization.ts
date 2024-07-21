"use server";

import { createClient } from "@/utils/supabase/server";
import getStripe from "@/utils/stripe";
import { incrementOnboardingStep } from "./incrementOnboardingStep";

export async function createOrganization(formData: FormData) {
  "use server";

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data: organization, error: createOrganizationError } = await supabase
    .from(
      "organizations",
    ).insert({
      name: formData.get("name") as string,
    }).select().single();

  if (createOrganizationError) {
    console.error("Create organization error");
    throw createOrganizationError;
  }

  const { error: updateProfileError } = await supabase.from("profiles").update({
    organization: organization.id,
  }).eq("id", user.id);

  if (updateProfileError) {
    console.error("Update profile error");
    throw updateProfileError;
  }

  // const { error: createOrganizationMemberError } = await supabase.from(
  //   "organizations_members",
  // ).insert({
  //   organization: organization.id,
  //   profile: user.id,
  // });

  // if (createOrganizationMemberError) {
  //   console.error("Create organization member error");
  //   throw createOrganizationMemberError;
  // }

  const stripe = getStripe();

  const customer = await stripe.customers.create({
    name: organization.name,
    metadata: { organization_id: organization.id },
  });

  await supabase.from("organizations").update({
    stripe_customer_id: customer.id,
  }).eq("id", organization.id);

  await incrementOnboardingStep();
}

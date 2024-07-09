"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import getStripe from "@/utils/stripe";
import { getOrganization } from "@/lib/auth";

export async function updateOrganization(formData: FormData) {
  "use server";

  const organization = await getOrganization();

  if (!organization?.stripe_customer_id) {
    throw new Error("Stripe customer not found");
  }

  const name = formData.get("name") as string;

  const supabase = createClient();

  const { error: updateOrganizationError } = await supabase
    .from("organizations").update({ name }).eq("id", organization.id);

  if (updateOrganizationError) throw updateOrganizationError;

  const stripe = getStripe();

  try {
    await stripe.customers.update(organization.stripe_customer_id, { name });
  } catch (updateStripeCustomerError) {
    throw updateStripeCustomerError;
  } finally {
    revalidatePath("/settings");
  }
}

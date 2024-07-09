"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import getStripe from "@/utils/stripe";
import { getCustomer } from "@/lib/stripe";

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

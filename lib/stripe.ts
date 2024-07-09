import getStripe from "@/utils/stripe";
import { getOrganization } from "@/lib/auth";
import Stripe from "stripe";

export async function getCustomer() {
  const stripe = getStripe();

  const organization = await getOrganization();

  if (!organization?.stripe_customer_id) return null;

  const customer = await stripe.customers.retrieve(
    organization.stripe_customer_id,
  );

  return customer as Stripe.Customer;
}

export async function getCustomerById(id: string) {
  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(id, { expand: ["address"] });
  return customer;
}

export async function getSetupIntent() {
  const stripeCustomer = await getCustomer();

  if (!stripeCustomer) throw new Error("No Stripe customer found");

  const stripe = getStripe();

  const {
    data: [setupIntent = null],
  } = await stripe.setupIntents.list({
    customer: stripeCustomer.id,
    limit: 1,
  });

  return setupIntent;
}

export async function getPaymentMethods() {
  const stripeCustomer = await getCustomer();

  if (!stripeCustomer) throw new Error("No Stripe customer found");

  const stripe = getStripe();

  const { data: paymentMethods } = await stripe.paymentMethods.list({
    customer: stripeCustomer.id,
    type: "card",
  });

  return paymentMethods;
}

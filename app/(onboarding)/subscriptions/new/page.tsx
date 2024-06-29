import getStripe from '@/utils/stripe'
import StripeForm from './StripeForm'
import { getCustomer } from '@/lib/stripe'
import { notFound } from 'next/navigation'
import Elements from '@/components/Elements'

export default async function SubscriptionPage() {
  const stripe = getStripe()

  const stripeCustomer = await getCustomer()

  if (!stripeCustomer) return notFound()

  const setupIntent = await stripe.setupIntents.create({
    customer: stripeCustomer.id,
    payment_method_types: ['card'],
  })

  if (!setupIntent.client_secret) return notFound()

  return (
    <div className="flex flex-col grow items-center justify-center w-full">
      <Elements options={{ clientSecret: setupIntent.client_secret }}>
        <StripeForm clientSecret={setupIntent.client_secret} />
      </Elements>
    </div>
  )
}

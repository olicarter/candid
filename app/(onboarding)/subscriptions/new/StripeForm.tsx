'use client'

import Elements from '@/components/Elements'
import { Button } from '@/components/ui/button'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { FormEvent, useState } from 'react'

export default function StripeForm(props: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)

  const handleError = error => {
    setLoading(false)
    setErrorMessage(error.message)
  }

  async function createSetupIntent(event: FormEvent<HTMLFormElement>) {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setLoading(true)

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      handleError(submitError)
      return
    }

    const { error } = await stripe.confirmSetup({
      elements,
      clientSecret: props.clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3001',
      },
    })

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the setup. Show the error to your customer (for example, payment details incomplete)
      handleError(error)
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form
      onSubmit={createSetupIntent}
      className="flex flex-col gap-8 max-w-md px-8 w-full"
    >
      <PaymentElement />
      <Button>Submit</Button>
    </form>
  )
}

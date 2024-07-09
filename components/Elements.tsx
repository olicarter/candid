'use client'

import { Elements } from '@stripe/react-stripe-js'
import { type StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { type ReactNode } from 'react'

export default function ElementsContext(props: {
  children: ReactNode
  options: StripeElementsOptions
}) {
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
  )

  const options: StripeElementsOptions = {
    ...props.options,
    // Fully customizable with appearance API.
    appearance: {
      ...props.options.appearance,
      variables: {
        colorPrimary: '#431407',
        colorBackground: '#fff7ed',
        colorText: '#431407',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4.5px',
        borderRadius: '0.375rem',
        focusBoxShadow: 'none',
        focusOutline: '2px solid #431407',
        ...props.options.appearance?.variables,
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {props.children}
    </Elements>
  )
}

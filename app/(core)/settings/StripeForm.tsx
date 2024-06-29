'use client'

import { AddressElement } from '@stripe/react-stripe-js'

export default function StripeForm() {
  return <AddressElement options={{ mode: 'billing' }} />
}

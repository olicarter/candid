import { ReactNode } from 'react'
import Nav from '@/app/Nav'
import { getOrganization } from '@/lib/auth'
import { getCustomer, getPaymentMethods, getSetupIntent } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function RootLayout(props: { children: ReactNode }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const organization = await getOrganization()
    if (!organization) redirect('/organizations/new')
    const stripeCustomer = await getCustomer()
    if (!stripeCustomer) redirect('/organizations/new')
  }

  return (
    <>
      <Nav />
      {props.children}
    </>
  )
}

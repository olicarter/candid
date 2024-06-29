import { ReactNode } from 'react'
import { getOrganization, getUser } from '@/lib/auth'
import { getCustomer, getSetupIntent } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import getStripe from '@/utils/stripe'

export default async function NewOrganizationLayout(props: {
  children: ReactNode
}) {
  const user = await getUser()
  if (!user) redirect('/')

  const organization = await getOrganization()
  if (organization) {
    const stripe = getStripe()

    const organization = await getOrganization()

    const {
      data: [customer = null],
    } = await stripe.customers.search({
      query: `metadata["organization_id"]:"${organization.id}"`,
      limit: 1,
    })

    if (customer) redirect('/subscriptions/new')
  }

  return <>{props.children}</>
}

import { ReactNode } from 'react'
import { getOrganization, getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SubscriptionLayout(props: {
  children: ReactNode
}) {
  const user = await getUser()
  if (!user) redirect('/')

  const organization = await getOrganization()
  if (!organization) redirect('/organizations/new')

  return <>{props.children}</>
}

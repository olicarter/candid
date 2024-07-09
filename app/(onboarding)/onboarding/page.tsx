import { redirect } from 'next/navigation'
import { getOrganization, getProfile } from '@/lib/auth'
import { Steps } from './components/steps'
import { getCustomer } from '@/lib/stripe'

export default async function OnboardingPage() {
  const profile = await getProfile()
  const organization = await getOrganization()
  const customer = await getCustomer()

  if (!profile || profile.onboarding_step === null) redirect('/')

  return (
    <Steps
      address={customer?.address ?? null}
      organization={organization}
      profile={profile}
    />
  )
}

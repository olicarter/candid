'use client'

import { useOptimistic } from 'react'
import Stripe from 'stripe'
import { type Tables } from '@/types/supabase'
import { AIPreferencesCard } from '../ai-preferences-card'
import { BillingDetailsCard } from '../billing-details-card'
import { IntegrationsCard } from '../integrations-card'
import { OrganizationDetailsCard } from '../organization-details-card'
import { PersonalDetailsCard } from '../personal-details-card'
import styles from './steps.module.css'

export function Steps(props: {
  address: Stripe.Address | null
  organization: Tables<'organizations'> | null
  profile: Tables<'profiles'>
}) {
  if (props.profile.onboarding_step === null) {
    throw new Error('Onboarding has been completed')
  }

  const stepsCount = 5

  const [optimisticStep, setOptimisticStep] = useOptimistic<number, number>(
    props.profile.onboarding_step,
    (_state, value) => value,
  )

  const goToNextStep = () => setOptimisticStep(optimisticStep + 1)
  const goToPrevStep = () => setOptimisticStep(optimisticStep - 1)

  return (
    <>
      <ul
        className={styles.stepIndicators}
        style={{
          transform: `translate(calc((100% / 9) * -${optimisticStep}))`,
        }}
      >
        {Array.from({ length: stepsCount }, (_, index) => (
          <input
            checked={optimisticStep === index}
            key={index}
            style={{ gridColumnStart: index + 5 }}
            tabIndex={optimisticStep === index ? 0 : -1}
            type="radio"
          />
        ))}
      </ul>
      <div className={styles.main}>
        <ul
          className={styles.cards}
          data-step={optimisticStep}
          style={{
            gridTemplateColumns: `repeat(${stepsCount}, 1fr)`,
            transform: `translate(calc(((100% / ${stepsCount}) * -${optimisticStep}) - ((2rem * ${optimisticStep}) / ${stepsCount})))`,
            width: `calc((100% * ${stepsCount}) + ((${stepsCount} - 1) * 2rem))`,
          }}
        >
          <PersonalDetailsCard
            active={optimisticStep === 0}
            onSubmit={goToNextStep}
            profile={props.profile}
          />
          <OrganizationDetailsCard
            active={optimisticStep === 1}
            onBack={goToPrevStep}
            onSubmit={goToNextStep}
            organization={props.organization}
          />
          <AIPreferencesCard
            active={optimisticStep === 2}
            onBack={goToPrevStep}
            onSubmit={goToNextStep}
          />
          <IntegrationsCard
            active={optimisticStep === 3}
            onBack={goToPrevStep}
            onSubmit={goToNextStep}
          />
          <BillingDetailsCard
            active={optimisticStep === 4}
            address={props.address}
            onBack={goToPrevStep}
          />
        </ul>
      </div>
    </>
  )
}

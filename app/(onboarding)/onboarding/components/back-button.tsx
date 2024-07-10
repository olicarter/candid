'use client'

import { Button, type ButtonProps } from '@/components/button'
import { decrementOnboardingStep } from '../actions/decrementOnboardingStep'

export type BackButtonProps = ButtonProps

export const BackButton = (props: BackButtonProps) => (
  <Button
    {...props}
    onClick={e => {
      props.onClick?.(e)
      decrementOnboardingStep()
    }}
    type="button"
    variant="light"
  >
    Back
  </Button>
)

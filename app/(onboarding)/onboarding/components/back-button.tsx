'use client'

import { Button, type ButtonProps } from '@/components/button'
import { decrementOnboardingStep } from '../actions/decrementOnboardingStep'

export type BackButtonProps = Pick<ButtonProps, 'onClick'>

export const BackButton = (props: BackButtonProps) => (
  <Button
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

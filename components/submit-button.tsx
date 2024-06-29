'use client'

import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from '@/components/ui/button'
import { useEffect } from 'react'
import { usePrevious } from 'react-use'

interface SubmitButtonProps extends ButtonProps {
  onPendingEnd?: () => void
  pendingText?: string
}

export function SubmitButton({
  children,
  pendingText,
  ...props
}: SubmitButtonProps) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction
  const isPendingPrev = !!usePrevious(isPending)

  useEffect(() => {
    if (isPendingPrev && !isPending) props.onPendingEnd?.()
  }, [isPending, isPendingPrev])

  return (
    <Button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </Button>
  )
}

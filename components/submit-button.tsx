'use client'

import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from '@/components/button'
import { useEffect } from 'react'
import { usePrevious } from 'react-use'

interface SubmitButtonProps extends ButtonProps {
  onPendingEnd?: () => void
  pendingText?: string
}

export function SubmitButton({
  children,
  onPendingEnd,
  pendingText,
  ...props
}: SubmitButtonProps) {
  const { action, pending } = useFormStatus()

  const isPending = pending && action === props.formAction
  const isPendingPrev = !!usePrevious(isPending)

  useEffect(() => {
    if (isPendingPrev && !isPending) onPendingEnd?.()
  }, [isPending, isPendingPrev, onPendingEnd])

  return (
    <Button {...props} disabled={isPending} type="submit">
      {isPending ? pendingText : children}
    </Button>
  )
}

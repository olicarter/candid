import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          'h-12 px-6 flex gap-3 items-center justify-center shrink-0 whitespace-nowrap text-lg font-semibold bg-orange-300 hover:bg-orange-300/70 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-950',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

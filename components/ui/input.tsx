import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-md border border-orange-200 bg-orange-50 px-4 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-950 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50 dark:border-orange-800 dark:bg-orange-950 dark:ring-offset-orange-950 dark:placeholder:text-orange-400 dark:focus-visible:ring-orange-300',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }

'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, previousValue, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-orange-100 dark:bg-orange-800',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="bg-orange-900 h-full w-full flex-1 relative transition-all dark:bg-orange-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <ProgressPrimitive.Indicator
      className={cn(
        'absolute top-0 left-0 h-full w-full flex-1 transition-all dark:bg-orange-100',
        previousValue < value! ? 'bg-emerald-500' : 'bg-red-500',
      )}
      style={{
        left: `${previousValue < value! ? previousValue : value}%`,
        width: `${
          previousValue < value!
            ? value! - previousValue
            : previousValue - value!
        }%`,
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

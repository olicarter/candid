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
        'absolute top-0 left-0 h-full w-full flex-1 transition-all',
        // previousValue < value! ? 'bg-emerald-500' : 'bg-red-500',
      )}
      style={{
        background:
          previousValue < value!
            ? `repeating-linear-gradient(315deg, #10b981 0px, #10b981 4px, transparent 4px, transparent 8px)`
            : `repeating-linear-gradient(315deg, #ef4444 0px, #ef4444 4px, transparent 4px, transparent 8px)`,
        left: `${previousValue < value! ? previousValue : value}%`,
        width: `${
          previousValue < value!
            ? value! - previousValue
            : previousValue - value!
        }%`,
      }}
    />
    <ProgressPrimitive.Indicator
      className="absolute bg-black h-full w-1 z-20 top-0"
      style={{ left: `${value}%` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

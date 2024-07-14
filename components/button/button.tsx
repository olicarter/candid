import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import styles from './button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'light' | 'red' | 'amber' | 'green'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, className, size = 'md', variant = 'primary', ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(styles.button, styles[size], styles[variant], className)}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

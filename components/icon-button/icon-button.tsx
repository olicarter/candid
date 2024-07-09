import { type ButtonHTMLAttributes } from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from './icon-button.module.css'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: LucideIcon
  variant?: 'primary' | 'red'
}

export function IconButton({
  className,
  icon: Icon,
  variant = 'primary',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[variant], className)}
      {...props}
    >
      <Icon size={20} strokeWidth={2} />
    </button>
  )
}

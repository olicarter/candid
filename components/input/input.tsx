import { InputHTMLAttributes } from 'react'
import styles from './input.module.css'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(styles.input, className)} {...props} />
}

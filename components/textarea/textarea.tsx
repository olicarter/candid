import { type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import styles from './textarea.module.css'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(styles.textarea, className)} {...props} />
}

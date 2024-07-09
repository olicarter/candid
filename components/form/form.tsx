import {
  forwardRef,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type LabelHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'
import styles from './form.module.css'

export type RootProps = FormHTMLAttributes<HTMLFormElement>

export const Root = forwardRef<HTMLFormElement, RootProps>(
  ({ className, ...props }, ref) => (
    <form className={cn(styles.form, className)} ref={ref} {...props} />
  ),
)

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label className={cn(styles.label, className)} ref={ref} {...props} />
  ),
)

export type FooterProps = HTMLAttributes<HTMLElement>

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => (
    <footer className={cn(styles.footer, className)} ref={ref} {...props} />
  ),
)

import { type HTMLAttributes, type PropsWithChildren, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import styles from './card.module.css'
import { Slot } from '@radix-ui/react-slot'

export type RootProps = HTMLAttributes<HTMLDivElement>

export const Root = forwardRef<HTMLDivElement, RootProps>(
  ({ className, ...props }, ref) => (
    <div className={cn(styles.card, className)} ref={ref} {...props} />
  ),
)

Root.displayName = 'CardRoot'

export type HeaderProps = HTMLAttributes<HTMLElement>

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className, ...props }, ref) => (
    <header className={cn(styles.header, className)} ref={ref} {...props} />
  ),
)

Header.displayName = 'CardHeader'

export type TitleProps = HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, ...props }, ref) => (
    <h3 className={cn(styles.title, className)} ref={ref} {...props} />
  ),
)

Title.displayName = 'CardTitle'

export type DescriptionProps = HTMLAttributes<HTMLParagraphElement>

export const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ className, ...props }, ref) => (
    <p className={cn(styles.description, className)} ref={ref} {...props} />
  ),
)

Description.displayName = 'CardDescription'

export type ContentProps = HTMLAttributes<HTMLDivElement>

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ className, ...props }, ref) => (
    <div className={cn(styles.content, className)} ref={ref} {...props} />
  ),
)

Content.displayName = 'CardContent'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'footer'
    return (
      <Comp className={cn(styles.footer, className)} ref={ref} {...props} />
    )
  },
)

Footer.displayName = 'CardFooter'

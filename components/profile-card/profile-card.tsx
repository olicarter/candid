import { Avatar as AvatarComponent, AvatarProps } from '@/components/avatar'
import { Slot } from '@radix-ui/react-slot'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './profile-card.module.css'

export interface RootProps {
  asChild?: boolean
  children: ReactNode
}

export function Root(props: RootProps) {
  const Comp = props.asChild ? Slot : 'div'

  return <Comp className={styles.profileCard}>{props.children}</Comp>
}

export type { AvatarProps }

export function Avatar({ className, ...props }: AvatarProps) {
  return <AvatarComponent className={cn(styles.avatar, className)} {...props} />
}

export interface TitleProps {
  children: ReactNode
  className?: string
}

export function Title({ className, ...props }: TitleProps) {
  return <p className={cn(styles.fullName, className)} {...props} />
}

export interface DescriptionProps {
  children: ReactNode
}

export function Description(props: DescriptionProps) {
  return <p className={styles.jobTitle}>{props.children}</p>
}

export interface ButtonProps {
  asChild?: boolean
  children: ReactNode
}

export function Button(props: ButtonProps) {
  const Comp = props.asChild ? Slot : 'button'

  return <Comp className={styles.button}>{props.children}</Comp>
}

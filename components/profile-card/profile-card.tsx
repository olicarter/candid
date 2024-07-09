import { Avatar as AvatarComponent, AvatarProps } from '@/components/avatar'
import { Slot } from '@radix-ui/react-slot'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './profile-card.module.css'

export function Root(props: { asChild?: boolean; children: ReactNode }) {
  const Comp = props.asChild ? Slot : 'div'

  return <Comp className={styles.profileCard}>{props.children}</Comp>
}

export function Avatar({ className, ...props }: AvatarProps) {
  return <AvatarComponent className={cn(styles.avatar, className)} {...props} />
}

export function Title(props: { children: ReactNode }) {
  return <p className={styles.fullName}>{props.children}</p>
}

export function Description(props: { children: ReactNode }) {
  return <p className={styles.jobTitle}>{props.children}</p>
}

export function Button(props: { asChild?: boolean; children: ReactNode }) {
  const Comp = props.asChild ? Slot : 'button'

  return <Comp className={styles.button}>{props.children}</Comp>
}

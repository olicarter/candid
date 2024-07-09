'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnchorHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import styles from './nav-link.module.css'

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

export function NavLink({ asChild, className, href, ...props }: NavLinkProps) {
  const pathname = usePathname()

  const Comp = asChild ? Slot : Link

  return (
    <Comp
      className={cn(styles.link, pathname === href && styles.active, className)}
      href={href ?? {}}
      {...props}
    />
  )
}

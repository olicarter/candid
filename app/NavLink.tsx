'use client'

import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'

interface NavLinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    Partial<LinkProps> {
  asChild?: boolean
}

export default function NavLink({
  asChild,
  className,
  href,
  ...props
}: NavLinkProps) {
  const pathname = usePathname()

  const Comp = asChild ? Slot : Link

  return (
    <Comp
      className={cn(
        'hover:underline leading-none p-3',
        className,
        pathname === href && 'underline',
      )}
      href={href}
      {...props}
    />
  )
}

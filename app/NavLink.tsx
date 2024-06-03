'use client'

import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { HTMLAttributes } from 'react'

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement>, LinkProps {}

export default function NavLink({ className, href, ...props }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      className={cn(
        'hover:underline leading-none left-0 p-3 top-0',
        className,
        pathname === href && 'underline',
      )}
      href={href}
      {...props}
    />
  )
}

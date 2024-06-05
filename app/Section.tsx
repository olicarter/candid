'use client'

import { cn } from '@/lib/utils'
import { type ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  intersectColor: string
}

export default function Section({
  className,
  intersectColor,
  ...props
}: SectionProps) {
  const ref = useRef(null)

  const intersection = useIntersection(ref, {
    // root: null,
    // rootMargin: '0px',
    threshold: 0.5,
  })

  const isIntersecting = intersection?.isIntersecting

  useEffect(() => {
    if (isIntersecting) document.documentElement.classList.add(intersectColor)
    else document.documentElement.classList.remove(intersectColor)
  }, [intersectColor, isIntersecting])

  return (
    <section
      className={cn(
        'flex items-center justify-evenly min-h-screen w-full',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

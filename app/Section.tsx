'use client'

import { type ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  intersectColor: string
}

export default function Section({ intersectColor, ...props }: SectionProps) {
  const ref = useRef(null)

  const intersection = useIntersection(ref, {
    // root: null,
    // rootMargin: '0px',
    threshold: 0.5,
  })

  const isIntersecting = intersection?.isIntersecting

  console.log(intersection)

  useEffect(() => {
    if (isIntersecting) document.documentElement.classList.add(intersectColor)
    else document.documentElement.classList.remove(intersectColor)
  }, [intersectColor, isIntersecting])

  return (
    <section
      className="flex items-center justify-evenly min-h-screen w-full"
      ref={ref}
      {...props}
    />
  )
}

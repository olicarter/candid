import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function FormField({
  className,
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      className={cn('col-span-full flex flex-col gap-x-8 gap-y-4', className)}
      {...props}
    />
  )
}

export function FormHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<'header'>) {
  return <header {...props} />
}

export function FormLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<'label'>) {
  return <label className={cn('font-semibold text-xl', className)} {...props} />
}

export function FormDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('opacity-80', className)} {...props} />
}

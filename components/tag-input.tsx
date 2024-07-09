'use client'

import { type InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { rokkitt } from '@/utils/fonts'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TagInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  defaultTags?: string[]
  onTagsChange?: (tags: string[]) => void
  size?: 'sm' | 'md' | 'lg'
}

export function TagInput({
  defaultTags,
  onTagsChange,
  size = 'md',
  ...props
}: TagInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState('')
  const [tags, setTags] = useState<Set<string>>(new Set(defaultTags))

  function appendTag() {
    if (value !== '') {
      setTags(prev => new Set([...prev, value]))
      setValue('')
    }
  }

  function deleteTag(tag: string) {
    setTags(prev => {
      const next = new Set(prev)
      next.delete(tag)
      return next
    })
  }

  function deleteLastTag() {
    if (value === '' && tags.size > 0) {
      setTags(prev => {
        const next = new Set(prev)
        const last = Array.from(prev).pop()
        if (last) next.delete(last)
        return next
      })
    }
  }

  useEffect(() => {
    onTagsChange?.(Array.from(tags))
  }, [tags])

  return (
    <div
      className={cn(
        'bg-orange-100 cursor-text flex flex-wrap relative ring-orange-950 has-[input:focus]:ring-2',
        rokkitt.className,
        {
          'gap-1.5 p-1.5 rounded-[0.5rem]': size === 'sm',
          'gap-2 p-2 rounded-[10px]': size === 'md',
          ' gap-3 p-3 rounded-[0.75rem]': size === 'lg',
        },
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {Array.from(tags).map(tag => (
        <button
          className={cn(
            'bg-orange-300 cursor-pointer flex gap-1 group items-center rounded-md',
            {
              'h-5 pl-1.5 pr-0.5 text-lg': size === 'sm',
              'h-6 pl-1.5 pr-1 text-xl': ['md', 'lg'].includes(size),
            },
          )}
          onClick={() => deleteTag(tag)}
        >
          {tag}
          <span className="outline-none ring-orange-950 rounded size-4 focus:ring-2 hover:bg-orange-200 group-hover:bg-orange-200">
            <X size={16} />
          </span>
        </button>
      ))}
      <input
        {...props}
        className={cn(
          'bg-transparent grow leading-none min-w-32 w-0 outline-none peer',
          {
            'h-5 text-lg': size === 'sm',
            'h-6 text-xl': ['md', 'lg'].includes(size),
          },
        )}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          switch (e.key) {
            case ' ':
            case 'Enter':
              e.preventDefault()
              if (inputRef.current?.validity.valid) appendTag()
              else inputRef.current?.reportValidity()
              break
            case 'Backspace':
              deleteLastTag()
              break
          }
        }}
        ref={inputRef}
        value={value}
      />
    </div>
  )
}

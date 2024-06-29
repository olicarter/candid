'use client'

import { cn } from '@/lib/utils'
import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/client'
import Image, { ImageProps } from 'next/image'
import { useMemo, useState } from 'react'
import { SetOptional } from 'type-fest'

interface AvatarProps extends SetOptional<ImageProps, 'alt' | 'src'> {
  profile?: Tables<'profiles'>
  size?: number
}

export default function Avatar({
  className,
  profile,
  size = 40,
  style,
  ...props
}: AvatarProps) {
  const [error, setError] = useState(false)

  const src = useMemo(() => {
    if (props.src) return props.src
    if (!profile?.avatar_url) return null
    if (profile?.avatar_url?.startsWith('http')) return profile.avatar_url
    const supabase = createClient()
    return supabase.storage.from('avatars').getPublicUrl(profile.avatar_url)
      .data.publicUrl
  }, [profile?.avatar_url, props.src])

  if (!src || error) {
    return (
      <div
        className={cn(
          'bg-orange-300 flex items-center justify-center outline-2 outline-orange-200 rounded-full shrink-0 text-lg transition-[margin]',
          className,
        )}
        style={{ height: size, width: size, ...style }}
      >
        {(profile?.full_name ?? profile?.email)?.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <Image
      alt="Avatar"
      className={cn(
        'bg-orange-300 outline-2 outline-orange-200 rounded-full shrink-0 transition-[margin]',
        className,
      )}
      height={size}
      onError={() => setError(true)}
      src={src}
      style={style}
      width={size}
      {...props}
    />
  )
}

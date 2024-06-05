'use client'

import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/client'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface AvatarProps extends Pick<ImageProps, 'style'> {
  profile: Tables<'profiles'>
  size?: number
}

export default function Avatar({ profile, size = 40, style }: AvatarProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className="bg-orange-300 flex items-center justify-center outline-2 outline-orange-200 rounded-full shrink-0 text-lg transition-[margin]"
        style={{ height: size, width: size, ...style }}
      >
        {profile.full_name?.charAt(0)}
      </div>
    )
  }

  const supabase = createClient()

  const src = profile.avatar_url
    ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data
        .publicUrl
    : ''

  return (
    <Image
      alt="Avatar"
      className="bg-orange-300 outline-2 outline-orange-200 rounded-full shrink-0 transition-[margin]"
      height={size}
      onError={() => setError(true)}
      src={src}
      style={style}
      width={size}
    />
  )
}

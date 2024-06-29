'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Tables } from '@/types/supabase'
import { uploadFile } from './actions'
import { createClient } from '@/utils/supabase/client'
import Avatar from '@/components/Avatar'

export default function AvatarInput(props: { profile: Tables<'profiles'> }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const [avatar, setAvatar] = useState<File | null>(null)

  const src = useMemo(() => {
    if (avatar) return URL.createObjectURL(avatar)
    if (props.profile.avatar_url) {
      if (props.profile.avatar_url.startsWith('http')) {
        return props.profile.avatar_url
      }
      const supabase = createClient()
      return supabase.storage
        .from('avatars')
        .getPublicUrl(props.profile.avatar_url).data.publicUrl
    }
    return ''
  }, [avatar, props.profile.avatar_url])

  return (
    <form
      action={uploadFile}
      className="relative shrink-0 size-48"
      ref={formRef}
    >
      <input
        className="absolute opacity-0 peer"
        name="avatar"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) {
            setAvatar(file)
            const formData = new FormData()
            formData.append('avatar', file)
            formRef.current?.requestSubmit()
          }
        }}
        ref={inputRef}
        type="file"
      />
      <Avatar
        className="cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-orange-950"
        onClick={() => inputRef.current?.click()}
        size={192}
        src={src}
      />
    </form>
  )
}

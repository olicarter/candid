'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Tables } from '@/types/supabase'
import { uploadFile } from './actions'
import { createClient } from '@/utils/supabase/client'

export default function AvatarInput(props: { profile: Tables<'profiles'> }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const [avatar, setAvatar] = useState<File | null>(null)

  const supabase = createClient()

  const src = avatar
    ? URL.createObjectURL(avatar)
    : props.profile.avatar_url
    ? supabase.storage.from('avatars').getPublicUrl(props.profile.avatar_url)
        .data.publicUrl
    : ''

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
      <Image
        alt="Profile picture"
        className="absolute bg-orange-50 cursor-pointer inset-0 rounded-full size-full peer-focus-visible:ring-2 peer-focus-visible:ring-orange-950 peer-focus-visible:ring-offset-2"
        height={192}
        onClick={() => inputRef.current?.click()}
        src={src}
        width={192}
      />
    </form>
  )
}

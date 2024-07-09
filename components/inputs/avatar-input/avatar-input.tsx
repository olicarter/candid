'use client'

import { useMemo, useRef, useState, type InputHTMLAttributes } from 'react'
import { uploadAvatar } from '@/actions/uploadAvatar'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import styles from './avatar-input.module.css'

export interface AvatarInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string
  onUpload?: (value: string) => void
  value?: string
}

export function AvatarInput({
  defaultValue,
  onUpload,
  ...props
}: AvatarInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [value, setValue] = useState(props.value ?? defaultValue)

  const avatarSrc = useMemo(() => {
    if (avatarFile) return URL.createObjectURL(avatarFile)
    return props.value ?? defaultValue ?? ''
  }, [avatarFile, defaultValue, props.value])

  return (
    <div className={styles.avatarField}>
      <Avatar className={styles.avatar} src={avatarSrc} />
      <Button onClick={() => inputRef.current?.click()} type="button">
        Upload file
      </Button>
      <input
        className={styles.fileInput}
        onChange={async event => {
          const file = event.target.files?.[0]
          setAvatarFile(file ?? null)
          if (file) {
            const formData = new FormData()
            formData.set('avatar', file)
            const value = await uploadAvatar(formData)
            setValue(value)
            onUpload?.(value)
          }
        }}
        ref={inputRef}
        tabIndex={-1}
        type="file"
      />
      <input name="avatar_url" value={value} {...props} type="hidden" />
    </div>
  )
}

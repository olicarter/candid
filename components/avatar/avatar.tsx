import Image from 'next/image'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import styles from './avatar.module.css'

export interface AvatarProps {
  className?: string
  src: string
}

export function Avatar(props: AvatarProps) {
  const supabase = createClient()

  let src = props.src

  if (
    !props.src.startsWith('http') &&
    !props.src.startsWith('blob') &&
    !props.src.startsWith('/')
  ) {
    src = supabase.storage.from('avatars').getPublicUrl(props.src)
      .data.publicUrl
  }

  return (
    <Image
      alt="Avatar"
      className={cn(styles.avatar, props.className)}
      draggable={false}
      height={64}
      src={src}
      width={64}
    />
  )
}

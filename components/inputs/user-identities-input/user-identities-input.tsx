import { type UserIdentity } from '@supabase/supabase-js'
import { IconButton } from '@/components/icon-button'
import { capitalize } from '@/lib/utils'
import { SiGoogle } from '@icons-pack/react-simple-icons'
import { Minus } from 'lucide-react'
import styles from './user-identities-input.module.css'

export interface UserIdentitiesInputProps {
  userIdentities?: UserIdentity[]
}

export function UserIdentitiesInput(props: UserIdentitiesInputProps) {
  return (
    <ul className={styles.userIdentities}>
      {props.userIdentities?.map(identity => (
        <div className={styles.userIdentity} key={identity.id}>
          <label tabIndex={0}>
            {identity.provider === 'google' && (
              <SiGoogle className={styles.icon} />
            )}
            <span>
              {capitalize(identity.provider)} (
              {identity.identity_data?.['email']})
            </span>
          </label>
          {props.userIdentities && props.userIdentities.length > 1 && (
            <IconButton icon={Minus} variant="red" />
          )}
        </div>
      ))}
    </ul>
  )
}

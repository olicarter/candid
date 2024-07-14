import { getOrganization, getProfile } from '@/lib/auth'
import { Avatar } from '@/components/avatar'
import { NavLink } from './nav-link'
import { Button } from '@/components/button'
import { cn } from '@/lib/utils'
import { signInWithGoogle } from '@/actions/signInWithGoogle'
import styles from './nav.module.css'
import { SubmitButton } from '../submit-button'

export async function Nav(props: { className?: string }) {
  const profile = await getProfile()
  const organization = await getOrganization()

  return (
    <div
      className={cn(
        styles.nav,
        profile && styles.authenticated,
        props.className,
      )}
    >
      <div className="flex gap-[inherit]">
        <span className={styles.logo}>{profile ? 'C.' : 'Candid'}</span>
        {profile && organization && (
          <nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/settings">Settings</NavLink>
          </nav>
        )}
      </div>
      <div className={styles.profile}>
        <div>
          {profile?.full_name && (
            <p className={styles.fullName}>{profile.full_name}</p>
          )}
          {profile?.job_title && (
            <p className={styles.jobTitle}>{profile.job_title}</p>
          )}
        </div>
        {profile?.avatar_url && (
          <Avatar className={styles.avatar} src={profile.avatar_url} />
        )}
        {!profile && (
          <form action={signInWithGoogle}>
            <SubmitButton
              formAction={signInWithGoogle}
              pendingText="Signing in..."
            >
              Sign in
            </SubmitButton>
          </form>
        )}
      </div>
    </div>
  )
}

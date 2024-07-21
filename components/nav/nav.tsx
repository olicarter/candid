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
      <span className={styles.logo}>C.</span>
      <nav>
        {profile && organization && (
          <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/settings">Settings</NavLink>
          </>
        )}
      </nav>
      <div className={styles.profile}>
        <div className={styles.profileDetails}>
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

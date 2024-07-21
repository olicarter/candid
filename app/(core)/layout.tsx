import { ReactNode } from 'react'
import { Nav } from '@/components/nav'
import { getOrganization, getProfile } from '@/lib/auth'
import { getCustomer } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import styles from './layout.module.css'
import Marquee from '@/components/marquee'
import {
  SiAmazon,
  SiApple,
  SiEbay,
  SiEtsy,
  SiFacebook,
  SiGoogle,
  SiLinkedin,
  SiMastercard,
  SiMicrosoft,
  SiNetflix,
  SiPaypal,
  SiSpotify,
  SiTwitter,
  SiVisa,
} from '@icons-pack/react-simple-icons'
import { SubmitButton } from '@/components/submit-button'
import { signInWithGoogle } from '@/actions/signInWithGoogle'

export default async function RootLayout(props: { children: ReactNode }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const organization = await getOrganization()
    if (!organization) redirect('/onboarding')
    const stripeCustomer = await getCustomer()
    if (!stripeCustomer) redirect('/onboarding')
  }

  if (user) {
    return (
      <>
        <section className={styles.section}>
          <Nav />
        </section>
        <main className={styles.content}>{props.children}</main>
      </>
    )
  }

  return (
    <div className="grow flex flex-col justify-between h-[calc(100svh-4rem-16vmin)] w-full">
      <section className={styles.hero}>
        <div className="flex flex-col gap-[4vmin]">
          <h1>Candid</h1>
          <p>AI-powered feedback for better teams</p>
          <form
            action={signInWithGoogle}
            className="flex justify-center mt-[4vmin]"
          >
            <SubmitButton
              formAction={signInWithGoogle}
              pendingText="Signing in..."
              size="lg"
            >
              Sign in with Google
            </SubmitButton>
          </form>
        </div>
        <Marquee autoFill speed={40} gradient gradientColor="#022c22">
          {[
            SiAmazon,
            SiApple,
            SiEbay,
            SiEtsy,
            SiFacebook,
            SiGoogle,
            SiLinkedin,
            SiMastercard,
            SiMicrosoft,
            SiNetflix,
            SiPaypal,
            SiSpotify,
            SiTwitter,
            SiVisa,
          ].map((Comp, i) => (
            <Comp className="mr-[12vmin] size-[calc(2vmin+1.5rem)]" key={i} />
          ))}
        </Marquee>
      </section>
    </div>
  )
}

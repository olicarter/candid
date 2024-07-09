import { ReactNode } from 'react'
import { Nav } from '@/components/nav'
import { getOrganization, getProfile } from '@/lib/auth'
import { getCustomer } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import styles from './layout.module.css'
import { Avatar } from '@/components/avatar'

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

  const profile = await getProfile()

  return (
    <>
      <section className="px-8 w-full">
        {profile ? (
          <Nav />
        ) : (
          <div className={styles.navWrapper}>
            <Nav />
            <section className={styles.hero}>
              <div>
                <h1>Team feedback you'll love</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                </p>
              </div>
              <div>
                <Avatar className={styles.avatar} src="/davis.jpg" />
                <div />
                <div />
                <Avatar className={styles.avatar} src="/kaylynn.jpg" />
              </div>
            </section>
          </div>
        )}
      </section>
      {props.children}
    </>
  )
}

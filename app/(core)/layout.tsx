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

  return (
    <div className={styles.main}>
      <section className={styles.section}>
        <Nav />
      </section>
      {!user && (
        <>
          <section className={styles.section}>
            <div className={styles.hero}>
              <div>
                <h1>Team feedback you&apos;ll love</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Molestiae modi aperiam repellat at adipisci, vitae ullam dicta
                  rem asperiores impedit voluptatem. Voluptatem eius laudantium
                  voluptatibus, eos quos deleniti esse facilis.
                </p>
              </div>
              <div className={styles.imagePlaceholder} />
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.clients}>
              <h3>Used by the sharpest tools in the shed</h3>
              <Marquee speed={40} gradient gradientColor="#022c22">
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
                  <Comp
                    className="mr-[12vmin] size-[calc(4vmin+1rem)]"
                    key={i}
                  />
                ))}
              </Marquee>
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.hero}>
              <div className={styles.imagePlaceholder} />
              <div>
                <h3>Dont stress about tone</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  optio veniam, distinctio doloribus molestias a alias quos
                  iusto eos ipsum rem eveniet, quis quaerat temporibus
                  reprehenderit aliquid ex dolorem nihil.
                </p>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.hero}>
              <div>
                <h3>Cultivate a vibrant culture</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quidem iusto adipisci, quisquam fugiat architecto perferendis
                  reiciendis iste tenetur aspernatur minima placeat mollitia rem
                  corporis? Eligendi temporibus assumenda quos dolorum!
                  Voluptatem?
                </p>
              </div>
              <div className={styles.imagePlaceholder} />
            </div>
          </section>
        </>
      )}
      <main className={styles.content}>{props.children}</main>
    </div>
  )
}

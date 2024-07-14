import { ReactNode } from 'react'
import { inter, rowdies } from '@/utils/fonts'
import { cn } from '@/lib/utils'
import { getProfile } from '@/lib/auth'
import '@/app/globals.css'
import styles from './layout.module.css'

export const metadata = {
  metadataBase: new URL(`${process.env.APP_URL}`),
  title: 'Candid | Feedback for humans',
  description: 'Feedback for humans',
}

export default async function RootLayout(props: { children: ReactNode }) {
  const profile = await getProfile()

  return (
    <html
      lang="en"
      className={cn(inter.className, rowdies.variable)}
      data-theme={profile?.theme ?? 'emerald'}
    >
      <body className="flex flex-col items-center">
        <div className={styles.main}>{props.children}</div>
      </body>
    </html>
  )
}

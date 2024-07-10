import { ReactNode } from 'react'
import { inter, rowdies } from '@/utils/fonts'
import { cn } from '@/lib/utils'
import '@/app/globals.css'
import { getProfile } from '@/lib/auth'

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
        <div className="flex flex-col items-center min-h-screen py-4 sm:py-8 gap-4 sm:gap-8 w-full *:w-full overflow-x-hidden">
          {props.children}
        </div>
      </body>
    </html>
  )
}

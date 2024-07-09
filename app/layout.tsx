import { ReactNode } from 'react'
import { inter, rowdies } from '@/utils/fonts'
import { cn } from '@/lib/utils'
import '@/app/globals.css'
import { getProfile } from '@/lib/auth'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3001'

export const metadata = {
  metadataBase: new URL(defaultUrl),
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
        <div className="flex flex-col min-h-screen py-8 gap-8 w-full">
          {props.children}
        </div>
      </body>
    </html>
  )
}

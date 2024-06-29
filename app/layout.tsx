import { ReactNode } from 'react'
import { inter } from '@/utils/fonts'
import { cn } from '@/lib/utils'
import '@/app/globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3001'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Candid | Feedback for humans',
  description: 'Feedback for humans',
}

export default async function RootLayout(props: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-orange-200 duration-500 font-serif text-orange-950 transition-colors',
        inter.className,
      )}
    >
      <body className="flex flex-col items-center min-h-screen">
        {props.children}
      </body>
    </html>
  )
}

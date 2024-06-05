import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'
import Nav from './Nav'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3001'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Candid | Feedback for humans',
  description: 'Feedback for humans',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-orange-200 duration-500 font-serif text-orange-950 transition-colors',
        inter.className,
      )}
    >
      <body className="flex flex-col items-center min-h-screen">
        <Nav />
        {props.children}
      </body>
    </html>
  )
}

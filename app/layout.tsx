import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'
import NavLink from './NavLink'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

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
        'bg-orange-200 duration-500 font-serif transition-colors',
        inter.className,
      )}
    >
      <body className="flex flex-col min-h-screen">
        <nav className="flex p-1.5">
          <NavLink className="font-bold" href="/">
            Candid
          </NavLink>
          <NavLink href="/profile">My Profile</NavLink>
          <NavLink href="/feedback">Give Feedback</NavLink>
        </nav>
        {props.children}
      </body>
    </html>
  )
}

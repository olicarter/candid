'use client'

import { useWindowScroll } from 'react-use'
import { type User } from '@supabase/supabase-js'
import NavLink from './NavLink'

export default function NavItems(props: { user: User | null }) {
  const { y } = useWindowScroll()

  // if (y > 96) {
  //   return (
  //     <button className="backdrop-blur bg-orange-200/70 font-bold hover:underline leading-none p-3 rounded-full">
  //       Menu
  //     </button>
  //   )
  // }

  return (
    <>
      <NavLink className="font-bold" href="/">
        Candid
      </NavLink>
      {props.user ? (
        <>
          <NavLink href="/profile">My Profile</NavLink>
          <NavLink href="/feedback">Give Feedback</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </>
      ) : (
        <NavLink href="/login">Sign in</NavLink>
      )}
    </>
  )
}

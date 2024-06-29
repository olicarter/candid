import { createClient } from '@/utils/supabase/server'
import NavLink from './NavLink'
import { signInWithGoogle } from './actions'

export default async function Nav() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="backdrop-blur bg-orange-200/80 flex px-5 py-1.5 max-w-screen-md w-full z-20">
      <NavLink className="font-bold" href="/">
        Candid
      </NavLink>
      {user ? (
        <>
          <NavLink href="/feedback">Give Feedback</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </>
      ) : (
        <form action={signInWithGoogle} className="flex items-center">
          <NavLink asChild>
            <button>Sign in</button>
          </NavLink>
        </form>
      )}
    </nav>
  )
}

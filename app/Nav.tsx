import { createClient } from '@/utils/supabase/server'
import NavItems from './NavItems'

export default async function Nav() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="backdrop-blur bg-orange-200/80 flex p-1.5 sticky top-0 w-full z-20">
      <NavItems user={user} />
    </nav>
  )
}

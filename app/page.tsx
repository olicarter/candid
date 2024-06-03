import { HeartHandshake, MilkOff, PiggyBank, Smile } from 'lucide-react'
import { SiGoogle } from '@icons-pack/react-simple-icons'
import Section from './Section'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function IndexPage() {
  async function signInWithGoogle() {
    'use server'
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/auth/callback`
          : 'http://localhost:3000/auth/callback',
      },
    })
    if (data.url) redirect(data.url)
    if (error) redirect('/login?message=Could not authenticate user')
  }

  return (
    <div className="flex flex-col">
      <Section intersectColor="bg-orange-200">
        <div className="font-serif px-8 space-y-8">
          <h1 className="font-bold text-8xl">candid.team</h1>
          <p className="text-3xl">
            AI-anonymised micro-feedback for teams that care
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <form action={signInWithGoogle}>
            <button className="h-16 px-6 flex gap-3 items-center text-xl font-semibold bg-orange-300 hover:bg-orange-300/70 rounded-md">
              <SiGoogle className="shrink-0" size={24} />
              <span className="shrink-0">Continue with Google</span>
            </button>
          </form>
        </div>
      </Section>
      <Section intersectColor="bg-purple-300">
        <MilkOff size={256} />
        <div className="font-serif max-w-screen-sm space-y-8">
          <h3 className="font-bold text-6xl">Don't bottle it up</h3>
          <p className="leading-normal text-2xl">
            Colleague got you elated, frustrated, or just plain confused?
            Letting them know is healthy, but conveying intention is hard. We
            make sure your thoughts are delivered in a constructive and
            considerate manner, regardless of how diplomatic your writing is.
          </p>
        </div>
      </Section>
      <Section intersectColor="bg-emerald-300">
        <div className="font-serif max-w-screen-sm space-y-8">
          <h3 className="font-bold text-6xl">Little and often</h3>
          <p className="leading-normal text-2xl">
            We make giving feedback faster than writing a tweet. With tools and
            integrations that meet you where you're at, you can give feedback
            instantly, wherever you are.
          </p>
          <ul className="flex font-bold font-sans gap-4">
            <li>Web</li>
            <li>Raycast</li>
            <li>CLI</li>
            <li>API</li>
            <li>VSCode</li>
            <li>Slack</li>
            <li>Teams</li>
          </ul>
        </div>
        <HeartHandshake size={256} />
      </Section>
      <Section intersectColor="bg-blue-300">
        <Smile size={256} />
        <div className="font-serif max-w-screen-sm space-y-8">
          <h3 className="font-bold text-6xl">As you were</h3>
          <p className="leading-normal text-2xl">
            We have one goal: to enable effective feedback in companies. Our
            product is intentionally simple and unobtrusive, so you can focus on
            what matters most.
          </p>
        </div>
      </Section>
      <Section intersectColor="bg-rose-300">
        <div className="font-serif max-w-screen-sm space-y-8">
          <h3 className="font-bold text-6xl">Keep the change</h3>
          <p className="leading-normal text-2xl">
            €0.01/feedback submitted. Even if everyone in your company gave
            feedback 10 times a day, it would only cost €2/user/month.
          </p>
        </div>
        <PiggyBank size={256} />
      </Section>
    </div>
  )
}

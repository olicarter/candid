import {
  HeartHandshake,
  MessageCircleHeart,
  MilkOff,
  PiggyBank,
  Smile,
} from 'lucide-react'
import { SiGoogle } from '@icons-pack/react-simple-icons'
import Section from './Section'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function IndexPage() {
  async function signInWithGoogle() {
    'use server'
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/auth/callback`
          : 'http://localhost:3001/auth/callback',
      },
    })
    if (data.url) redirect(data.url)
    if (error) redirect('/login?message=Could not authenticate user')
  }

  return (
    <div className="flex flex-col">
      <Section className="gap-8 px-8" intersectColor="bg-orange-200">
        <div className="max-w-2xl space-y-4">
          <p className="font-bold text-5xl">Feedback your team loves</p>
          <p className="opacity-80 text-xl">
            Simple and focused feedback sharing tool, safe and considerate for
            your employees, and tailored to your company's values, with optional
            AI-powered anonymisation, aggregation and value alignment analysis.
          </p>
          <form action={signInWithGoogle}>
            <Button>Get started</Button>
          </form>
        </div>
        <MessageCircleHeart
          className="opacity-80"
          strokeWidth={1.3}
          size={256}
        />
      </Section>
      <Section className="text-emerald-950" intersectColor="bg-emerald-200">
        <MilkOff className="opacity-80" size={256} strokeWidth={1.3} />
        <div className="font-serif max-w-2xl space-y-8">
          <h3 className="font-bold text-6xl">Don't bottle it up</h3>
          <p className="opacity-80 text-2xl">
            Giving feedback is healthy, but conveying intention is hard. We make
            sure your thoughts are delivered in a constructive and considerate
            manner, regardless of how diplomatic your writing is.
          </p>
        </div>
      </Section>
      <Section className="text-blue-950" intersectColor="bg-blue-200">
        <div className="font-serif max-w-2xl space-y-8">
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
        <HeartHandshake className="opacity-80" size={256} strokeWidth={1.3} />
      </Section>
      <Section className="text-purple-950" intersectColor="bg-purple-200">
        <Smile className="opacity-80" size={256} strokeWidth={1.3} />
        <div className="font-serif max-w-2xl space-y-8">
          <h3 className="font-bold text-6xl">As you were</h3>
          <p className="leading-normal text-2xl">
            We have one goal: to enable effective feedback in companies. Our
            product is intentionally simple and unobtrusive, so you can focus on
            what matters most.
          </p>
        </div>
      </Section>
      <Section className="text-rose-950" intersectColor="bg-rose-200">
        <div className="font-serif max-w-2xl space-y-8">
          <h3 className="font-bold text-6xl">1¢ per feedback</h3>
          <p className="leading-normal text-2xl">
            Even if everyone in your company gave feedback 10 times a day, it
            would only cost €2/user/month.
          </p>
        </div>
        <PiggyBank className="opacity-80" size={256} strokeWidth={1.3} />
      </Section>
    </div>
  )
}

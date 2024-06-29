import Avatar from '@/components/Avatar'
import { createClient } from '@/utils/supabase/server'
import ProfilePage from '@/app/(core)/ProfilePage'

export default async function IndexPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) return <ProfilePage />

  return (
    <div className="flex flex-col gap-y-24 px-8 py-24 grow items-center max-w-screen-md w-full *:w-4/5 [&>:nth-child(2n+2)]:self-start [&>:nth-child(2n+3)]:self-end [&>:nth-child(2n+3)]:text-right">
      <section className="col-span-full flex flex-col gap-4 items-center">
        <div className="relative size-32">
          <Avatar
            className="absolute bg-orange-300 border-orange-200 border-4 top-0 left-0 -translate-x-1/4 rounded-full"
            size={128}
            src="https://i.pravatar.cc/256?img=57"
          />
          <Avatar
            className="absolute bg-orange-400 border-orange-200 border-4 top-0 left-0 translate-x-1/4 rounded-full z-10"
            size={128}
            src="https://i.pravatar.cc/256?img=35"
          />
        </div>
        <h5 className="font-bold text-3xl">Candid</h5>
      </section>
      <section>
        <h3 className="font-semibold text-2xl">Feedback your team loves</h3>
        <p className="opacity-80">
          Simple and focused feedback sharing tool, safe and considerate for
          your employees, and tailored to your company's values, with optional
          AI-powered anonymisation, aggregation and value alignment analysis.
        </p>
      </section>
      <section>
        <h3 className="font-semibold text-2xl">Don't bottle it up</h3>
        <p className="opacity-80">
          Giving feedback is healthy, but conveying intention is hard. We make
          sure your thoughts are delivered in a constructive and considerate
          manner, regardless of how diplomatic your writing is.
        </p>
      </section>
      <section>
        <h3 className="font-semibold text-2xl">Little and often</h3>
        <p className="opacity-80">
          We make giving feedback faster than writing a tweet. With tools and
          integrations that meet you where you're at, you can give feedback
          instantly, wherever you are.
        </p>
      </section>
      <section>
        <h3 className="font-semibold text-2xl">As you were</h3>
        <p className="opacity-80">
          We have one goal: to enable effective feedback in companies. Our
          product is intentionally simple and unobtrusive, so you can focus on
          what matters most.
        </p>
      </section>
      <section>
        <h3 className="font-semibold text-2xl">1¢ per feedback</h3>
        <p className="opacity-80">
          Even if everyone in your company gave feedback 10 times a day, it
          would only cost €2/user/month.
        </p>
      </section>
    </div>
  )
}

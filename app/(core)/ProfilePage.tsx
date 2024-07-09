import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import AvatarInput from '@/app/AvatarInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/input'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Avatar from '@/components/Avatar'

const data = [
  {
    name: 'Communication',
    value: 96,
    previousValue: 84,
  },
  {
    name: 'Teamwork',
    value: 84,
    previousValue: 79,
  },
  {
    name: 'Problem Solving',
    value: 78,
    previousValue: 89,
  },
  {
    name: 'Adaptability',
    value: 67,
    previousValue: 72,
  },
  {
    name: 'Creativity',
    value: 59,
    previousValue: 68,
  },
]

export default async function ProfilePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile creation failed. Please contact support.')
  }

  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 1)
  const previousMonthName = currentDate.toLocaleString('default', {
    month: 'long',
  })

  return (
    <div className="flex flex-col gap-x-8 gap-y-24 max-w-screen-md px-8 py-24 w-full">
      <section className="flex flex-col gap-4 items-center">
        <Avatar profile={profile} size={128} />
        <h5 className="font-bold text-3xl">{profile.full_name}</h5>
      </section>
      <section>
        <header>
          <h5 className="font-bold text-xl">{previousMonthName} Summary</h5>
          <p className="opacity-80">
            Your recently received feedback shows better collaboration and
            communication within the team, which is great. However, there's been
            a dip in tackling problems and coming up with creative solutions.
            Flexibility has improved slightly. Let's focus on boosting
            problem-solving and creativity while keeping up the good work in
            other areas.
          </p>
        </header>
      </section>
      <section className="flex flex-col gap-x-8 gap-y-4">
        <header>
          <h5 className="font-bold text-xl">Values</h5>
          <p className="opacity-80">
            This is how closely you align with the company's values, based on
            analysis of the feedback you've received over the past 6 months.
          </p>
        </header>
        <ul className="flex flex-col gap-4">
          {data.map(trait => (
            <li
              className="gap-4 grid grid-cols-[137px_1fr] items-center"
              key={trait.name}
            >
              <span className="font-bold leading-none whitespace-nowrap">
                {trait.name}
              </span>
              <Progress
                previousValue={trait.previousValue}
                value={trait.value}
              />
            </li>
          ))}
        </ul>
        {/* <ul className="gap-4 grid grid-cols-2 place-content-start">
            {data.map(trait => (
              <li
                className="col-span-full gap-4 grid grid-cols-[140px_1fr] items-center"
                key={trait.name}
              >
                <span className="font-bold leading-none whitespace-nowrap">
                  {trait.name}
                </span>
                <Progress
                  previousValue={trait.previousValue}
                  value={trait.value}
                />
              </li>
            ))}
          </ul> */}
      </section>
      <section className="flex flex-col gap-x-8 gap-y-4">
        <header>
          <h5 className="font-bold text-xl">Sentiment</h5>
          <p className="opacity-80">
            This is an average of how positive or negative the feedback you've
            sent and received has been. There's no right or wrong here, but it's
            generally good to maintain a healthy balance.
          </p>
        </header>
        <div className="grid grid-cols-2 gap-[inherit]">
          <div className="space-y-1">
            <span className="font-bold">Sent</span>
            <div className="bg-orange-100 h-4 relative rounded-full w-full">
              <div className="absolute bg-orange-950 w-1 left-1/2 -translate-x-1/2 h-full z-10" />
              <div className="absolute bg-red-500 h-full right-1/2 w-2/6" />
              <div className="absolute bg-emerald-500 h-full left-1/2 w-1/6" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-bold">Received</span>
            <div className="bg-orange-100 h-4 relative rounded-full w-full">
              <div className="absolute bg-orange-950 w-1 left-1/2 -translate-x-1/2 h-full z-10" />
              <div className="absolute bg-red-500 h-full right-1/2 w-1/6" />
              <div className="absolute bg-emerald-500 h-full left-1/2 w-2/6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

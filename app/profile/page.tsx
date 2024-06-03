import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import AvatarInput from '@/app/AvatarInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'

const data = [
  {
    name: 'Communication',
    value: 96,
    previousValue: 94,
  },
  {
    name: 'Teamwork',
    value: 84,
    previousValue: 81,
  },
  {
    name: 'Problem Solving',
    value: 79,
    previousValue: 83,
  },
  {
    name: 'Adaptability',
    value: 75,
    previousValue: 72,
  },
  {
    name: 'Creativity',
    value: 63,
    previousValue: 67,
  },
]

export default async function ProfilePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select()
      .eq('id', user.id)
      .single()

    if (!profile) {
      throw new Error('Profile creation failed. Please contact support.')
    }

    if (profile.updated_at === null) {
      const updateProfile = async (formData: FormData) => {
        'use server'
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) redirect('/login')
        await supabase
          .from('profiles')
          .update({
            full_name: formData.get('full_name') as string,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)
        revalidatePath('/')
      }

      return (
        <div className="flex grow items-center justify-evenly">
          <div className="flex flex-col gap-4 items-center max-w-xs w-full">
            <AvatarInput profile={profile} />
            <form
              action={updateProfile}
              className="flex flex-col gap-[inherit]"
            >
              <Input defaultValue={profile.full_name ?? ''} name="full_name" />
              <Button>Continue</Button>
            </form>
          </div>
        </div>
      )
    }

    const avatarPublicUrl = supabase.storage
      .from('avatars')
      .getPublicUrl(profile.avatar_url!).data.publicUrl

    return (
      <div className="flex flex-col grow items-center justify-center">
        <div className="gap-8 grid max-w-screen-sm px-8 w-full">
          <div className="flex flex-col gap-4 items-center">
            <Image
              alt="Avatar"
              className="rounded-full"
              height={128}
              src={avatarPublicUrl}
              width={128}
            />
            <h5 className="font-bold text-3xl">{profile.full_name}</h5>
          </div>
          <p className="opacity-80">
            Your recently received feedback shows better collaboration and
            communication within the team, which is great. However, there's been
            a dip in tackling problems and coming up with creative solutions.
            Flexibility has improved slightly. Let's focus on boosting
            problem-solving and creativity while keeping up the good work in
            other areas.
          </p>
          <ul className="gap-4 grid grid-cols-2 place-content-start">
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
          </ul>
        </div>
      </div>
    )
  }
}

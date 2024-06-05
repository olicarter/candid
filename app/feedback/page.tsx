import ProfilesCombobox from '@/app/ProfilesCombobox'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default async function FeedbackCreatePage(props: {
  searchParams: Record<string, string>
}) {
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

  if (!profile) redirect('/profile')

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .neq('id', user.id)
    .limit(5)

  const recipient = profiles?.find(p => p.id === props.searchParams.recipient)

  return (
    <div className="flex flex-col gap-y-24 py-24 grow items-center max-w-screen-md w-full">
      <section className="col-span-full flex flex-col gap-4 items-center">
        <div className="relative size-32">
          <Image
            alt="Avatar"
            className="absolute top-0 left-0 -translate-x-1/4 rounded-full"
            height={128}
            src={
              supabase.storage
                .from('avatars')
                .getPublicUrl(profile?.avatar_url!).data.publicUrl
            }
            width={128}
          />
          {recipient?.avatar_url ? (
            <Image
              alt="Avatar"
              className="absolute top-0 left-0 rounded-full translate-x-1/4"
              height={128}
              src={
                supabase.storage
                  .from('avatars')
                  .getPublicUrl(recipient.avatar_url).data.publicUrl
              }
              width={128}
            />
          ) : (
            <div
              className={cn(
                'bg-orange-300 flex items-center justify-center text-5xl rounded-full size-32 absolute top-0 left-0 translate-x-1/4',
                recipient ? 'z-10' : '-z-10',
              )}
            >
              {recipient?.full_name?.charAt(0)}
            </div>
          )}
        </div>
        <h5 className="font-bold text-3xl">Give Feedback</h5>
      </section>
      <form action={submitFeedback} className="flex flex-col gap-8 px-8">
        <div className="col-span-full flex flex-col gap-x-8 gap-y-4">
          <header>
            <label
              className="col-span-full font-semibold text-2xl"
              htmlFor="feedback"
            >
              Recipient
            </label>
            <p className="opacity-80">
              Select the person you want to give feedback to. If there are
              several, submit a feedback for each.
            </p>
          </header>
          <ProfilesCombobox
            autoFocus
            defaultValue={recipient?.id}
            name="recipient"
            profiles={profiles}
          />
        </div>
        <div className="col-span-full flex flex-col gap-x-8 gap-y-4">
          <header>
            <label
              className="col-span-full font-semibold text-2xl"
              htmlFor="feedback"
            >
              Feedback
            </label>
            <p className="opacity-80">
              Write your thoughts and feelings as they are. We default to
              anonymising what you write, though you can choose below to send it
              unaltered if you wish.
            </p>
          </header>
          <Textarea id="feedback" name="feedback" required rows={6} />
        </div>
        <Button>Submit Feedback</Button>
      </form>
    </div>
  )
}

async function submitFeedback(formData: FormData) {
  'use server'
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const recipient = formData.get('recipient') as string
  const content = formData.get('feedback') as string
  const { error } = await supabase.from('feedback').insert({
    content,
    created_by: user.id,
    recipient,
  })
  if (error) {
    console.error(error)
    redirect('/?message=Error submitting feedback')
  }
  redirect('/?message=Feedback submitted successfully')
}

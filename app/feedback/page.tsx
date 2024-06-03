import ProfilesCombobox from '@/app/ProfilesCombobox'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function FeedbackCreatePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .neq('id', user.id)
    .limit(5)

  return (
    <div className="flex flex-col grow items-center justify-center">
      <form
        action={submitFeedback}
        className="gap-8 grid grid-cols-2 max-w-screen-lg px-8"
      >
        <div className="col-span-full gap-x-8 gap-y-4 grid grid-cols-subgrid">
          <label
            className="col-span-full font-semibold leading-none text-2xl"
            htmlFor="feedback"
          >
            Feedback
          </label>
          <Textarea autoFocus id="feedback" name="feedback" required rows={6} />
          <p className="opacity-50">
            Be candid, write your thoughts and feelings as they are. We default
            to anonymising what you write, though you can choose below to send
            it unaltered if you wish.
          </p>
        </div>
        <div className="col-span-full gap-x-8 gap-y-4 grid grid-cols-subgrid">
          <label
            className="col-span-full font-semibold leading-none text-2xl"
            htmlFor="feedback"
          >
            Recipient
          </label>
          <ProfilesCombobox name="recipient" profiles={profiles} />
          <p className="opacity-50">
            Select the person you want to give feedback to. If there are
            several, submit a feedback for each.
          </p>
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

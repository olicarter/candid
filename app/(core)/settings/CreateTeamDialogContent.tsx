import { createTeam } from '@/app/actions'
import { FormField, FormLabel } from '@/components/form'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/server'
import { SubmitButton } from '@/components/submit-button'

export default async function CreateTeamDialogContent() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('User not found')

  const { data: profile, error: getProfileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (getProfileError) {
    console.error('CreateTeamDialogContent getProfileError')
    throw getProfileError
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Create team</DialogTitle>
        <DialogDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          reiciendis nulla debitis.
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-[inherit]">
        <FormField>
          <div className="gap-4 grid grid-cols-[49px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="name"
            >
              Name
            </FormLabel>
            <Input id="name" name="name" />
          </div>
        </FormField>
        <SubmitButton formAction={createTeam} pendingText="Saving...">
          Save
        </SubmitButton>
      </form>
    </DialogContent>
  )
}

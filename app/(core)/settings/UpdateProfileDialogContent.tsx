import { updateProfile } from '@/app/actions'
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

export default async function UpdateProfileDialogContent() {
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

  if (getProfileError) throw getProfileError

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Edit personal details</DialogTitle>
        <DialogDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, eos
          eaque inventore.
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-[inherit]">
        <FormField>
          <div className="gap-4 grid grid-cols-[85px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="full_name"
            >
              Full Name
            </FormLabel>
            <Input
              autoComplete="name"
              defaultValue={profile.full_name ?? undefined}
              id="full_name"
              name="full_name"
            />
          </div>
        </FormField>
        <SubmitButton formAction={updateProfile} pendingText="Saving...">
          Save
        </SubmitButton>
      </form>
    </DialogContent>
  )
}

import { updateOrganization } from '@/app/actions'
import { FormField, FormLabel } from '@/components/form'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/submit-button'
import { getOrganization } from '@/lib/auth'

export default async function UpdateOrganizationDialogContent() {
  const organization = await getOrganization()

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Edit organization details</DialogTitle>
        <DialogDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          reiciendis nulla debitis.
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-[inherit]">
        <input type="hidden" name="organization_id" value={organization.id} />
        <input
          type="hidden"
          name="stripe_customer_id"
          value={organization.stripe_customer_id ?? ''}
        />
        <FormField>
          <div className="gap-4 grid grid-cols-[85px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="name"
            >
              Name
            </FormLabel>
            <Input
              autoComplete="name"
              defaultValue={organization.name}
              id="name"
              name="name"
            />
          </div>
        </FormField>
        <SubmitButton formAction={updateOrganization} pendingText="Saving...">
          Save
        </SubmitButton>
      </form>
    </DialogContent>
  )
}

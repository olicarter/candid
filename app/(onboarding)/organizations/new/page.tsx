import { createOrganization } from '@/app/actions'
import { FormField, FormHeader, FormLabel } from '@/components/form'
import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

export default async function OnboardingPage() {
  return (
    <div className="flex flex-col grow items-center justify-center w-full">
      <form
        action={createOrganization}
        className="flex flex-col gap-8 max-w-md px-8 w-full"
      >
        <FormField>
          <FormHeader>
            <FormLabel className="col-span-full" htmlFor="feedback">
              Organization name
            </FormLabel>
            {/* <FormDescription>
              Select the person you want to give feedback to. If there are
              several, submit a feedback for each.
            </FormDescription> */}
          </FormHeader>
          <Input
            autoComplete="organization"
            id="organizationName"
            name="organizationName"
          />
        </FormField>
        <SubmitButton formAction={createOrganization} pendingText="Creating...">
          Create
        </SubmitButton>
      </form>
    </div>
  )
}

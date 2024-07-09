import { updateStripeCustomer } from '@/actions/updateStripeCustomer'
import { FormField, FormLabel } from '@/components/form'
import { SubmitButton } from '@/components/submit-button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog'
import { Input } from '@/components/input'
import { getCustomer } from '@/lib/stripe'

export default async function UpdateBillingDialogContent() {
  const stripeCustomer = await getCustomer()

  if (!stripeCustomer) throw new Error('Stripe customer not found')

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Edit billing address</DialogTitle>
        <DialogDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          reiciendis nulla debitis.
        </DialogDescription>
      </DialogHeader>
      <form
        action={updateStripeCustomer}
        className="flex flex-col gap-[inherit]"
      >
        <FormField>
          <div className="gap-4 grid grid-cols-[97px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="line1"
            >
              Line One
            </FormLabel>
            <Input
              autoComplete="address-line1"
              defaultValue={stripeCustomer.address?.line1 ?? undefined}
              id="line1"
              name="line1"
            />
          </div>
        </FormField>
        <FormField>
          <div className="gap-4 grid grid-cols-[97px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="line2"
            >
              Line Two
            </FormLabel>
            <Input
              autoComplete="address-line2"
              defaultValue={stripeCustomer.address?.line2 ?? undefined}
              id="line2"
              name="line2"
            />
          </div>
        </FormField>
        <FormField>
          <div className="gap-4 grid grid-cols-[97px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="city"
            >
              City
            </FormLabel>
            <Input
              autoComplete="address-level2"
              defaultValue={stripeCustomer.address?.city ?? undefined}
              id="city"
              name="city"
            />
          </div>
        </FormField>
        <FormField>
          <div className="gap-4 grid grid-cols-[97px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="state"
            >
              State
            </FormLabel>
            <Input
              autoComplete="address-level1"
              defaultValue={stripeCustomer.address?.state ?? undefined}
              id="state"
              name="state"
            />
          </div>
        </FormField>
        <FormField>
          <div className="gap-4 grid grid-cols-[97px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="postal_code"
            >
              Postal Code
            </FormLabel>
            <Input
              autoComplete="postal-code"
              defaultValue={stripeCustomer.address?.postal_code ?? undefined}
              id="postal_code"
              name="postal_code"
            />
          </div>
        </FormField>
        <FormField>
          <div className="gap-4 grid grid-cols-[97px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="country"
            >
              Country
            </FormLabel>
            <Input
              autoComplete="country"
              defaultValue={stripeCustomer.address?.country ?? undefined}
              id="country"
              name="country"
            />
          </div>
        </FormField>
        <SubmitButton formAction={updateStripeCustomer} pendingText="Saving...">
          Save
        </SubmitButton>
      </form>
    </DialogContent>
  )
}

'use client'

import Stripe from 'stripe'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { updateAddress } from '@/actions/updateAddress'
import { DialogClose } from '@/components/dialog'
import { SubmitButton } from '@/components/submit-button'

export function UpdateAddressCard(props: {
  address: Stripe.Address | null | undefined
}) {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Payment Method</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={updateAddress}>
          <Form.Label>Line One</Form.Label>
          <Input
            autoComplete="address-line1"
            defaultValue={props.address?.line1 ?? undefined}
            required
          />
          <Form.Label>Line Two</Form.Label>
          <Input
            autoComplete="address-line2"
            defaultValue={props.address?.line2 ?? undefined}
          />
          <Form.Label>City</Form.Label>
          <Input
            autoComplete="address-level2"
            defaultValue={props.address?.city ?? undefined}
            required
          />
          <Form.Label>Postal Code</Form.Label>
          <Input
            autoComplete="postal-code"
            defaultValue={props.address?.postal_code ?? undefined}
            required
          />
          <Form.Label>Country</Form.Label>
          <Input
            autoComplete="country-name"
            defaultValue={props.address?.country ?? undefined}
            required
          />
          <Form.Footer>
            <DialogClose asChild>
              <Button type="button" variant="light">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton pendingText="Saving...">Save</SubmitButton>
          </Form.Footer>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

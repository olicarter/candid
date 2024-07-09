'use client'

import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { createPaymentMethod } from '@/actions/createPaymentMethod'
import { DialogClose } from '@/components/dialog'
import { SubmitButton } from '@/components/submit-button'
import styles from './payment-method-card.module.css'

export function PaymentMethodCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Payment Method</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={createPaymentMethod}>
          <Form.Label>Card Number</Form.Label>
          <Input
            autoComplete="cc-number"
            className={styles.numberInput}
            name="cc-number"
            required
          />
          <Form.Label>CVV</Form.Label>
          <Input
            autoComplete="cc-csc"
            className={styles.numberInput}
            name="cc-csc"
            required
          />
          <Form.Label>Expiry Date</Form.Label>
          <Input
            autoComplete="cc-exp"
            className={styles.numberInput}
            name="cc-exp"
            required
          />
          <Form.Label>Name on Card</Form.Label>
          <Input autoComplete="cc-name" name="cc-name" required />
          <Form.Footer>
            <DialogClose asChild>
              <Button type="button" variant="light">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton pendingText="Adding card...">Add card</SubmitButton>
          </Form.Footer>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

import { SiMastercard, SiVisa } from '@icons-pack/react-simple-icons'
import { type PaymentMethod } from '@stripe/stripe-js'
import { cn } from '@/lib/utils'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Button } from '@/components/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/dialog'
import { Input } from '@/components/input'
import { PaymentMethodCard } from '@/components/cards/payment-method-card'
import { UpdateAddressCard } from '@/components/cards/update-address-card'
import styles from './billing-details-card.module.css'
import { SubmitButton } from '@/components/submit-button'
import { BackButton, BackButtonProps } from '../back-button'
import Stripe from 'stripe'
import { forwardRef } from 'react'
import { updateBillingDetails } from '../../actions/updateBillingDetails'

export interface BillingDetailsCardProps {
  active: boolean
  address: Stripe.Address | null
  onBack: BackButtonProps['onClick']
  paymentMethod?: PaymentMethod | null
}

export const BillingDetailsCard = forwardRef<
  HTMLDivElement,
  BillingDetailsCardProps
>((props, ref) => {
  const tabIndex = props.active ? 0 : -1

  const addressParts = [
    props.address?.line1,
    props.address?.line2,
    props.address?.city,
    props.address?.postal_code,
    props.address?.country,
  ]

  const addressValue = addressParts
    .filter(part => part !== undefined)
    .join(', ')

  return (
    <Card.Root ref={ref}>
      <Card.Header>
        <Card.Title>Billing Details</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={updateBillingDetails}>
          <Form.Label>Payment Method</Form.Label>
          <div className={styles.field}>
            <div className={styles.paymentMethod}>
              {props.paymentMethod?.card && (
                <>
                  <div
                    className={cn(
                      styles.card,
                      props.paymentMethod.card.brand === 'mastercard' &&
                        styles.mastercard,
                      props.paymentMethod.card.brand === 'visa' && styles.visa,
                    )}
                  >
                    {props.paymentMethod.card.brand === 'mastercard' && (
                      <SiMastercard className={styles.icon} />
                    )}
                    {props.paymentMethod.card.brand === 'visa' && (
                      <SiVisa className={styles.icon} />
                    )}
                  </div>
                  <span>····{props.paymentMethod.card.last4}</span>
                </>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button tabIndex={tabIndex}>Add card</Button>
              </DialogTrigger>
              <DialogContent>
                <PaymentMethodCard />
              </DialogContent>
            </Dialog>
          </div>
          <Form.Label>Billing Address</Form.Label>
          <div className={styles.field}>
            <Input
              className="grow"
              readOnly
              tabIndex={tabIndex}
              type="text"
              value={addressValue}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button tabIndex={tabIndex}>Update</Button>
              </DialogTrigger>
              <DialogContent>
                <UpdateAddressCard address={props.address} />
              </DialogContent>
            </Dialog>
          </div>
          <Form.Footer>
            <BackButton onClick={props.onBack} tabIndex={tabIndex} />
            <SubmitButton
              formAction={updateBillingDetails}
              pendingText="Saving..."
              tabIndex={tabIndex}
            >
              Continue
            </SubmitButton>
          </Form.Footer>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
})

BillingDetailsCard.displayName = 'BillingDetailsCard'

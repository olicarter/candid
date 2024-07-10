import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Input } from '@/components/input'
import { type PaymentMethod } from '@stripe/stripe-js'
import { SiMastercard, SiVisa } from '@icons-pack/react-simple-icons'
import styles from './billing-details-card.module.css'
import { cn } from '@/lib/utils'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/dialog'
import { PaymentMethodCard } from '@/components/cards/payment-method-card'
import { UpdateAddressCard } from '@/components/cards/update-address-card'
import { getCustomer } from '@/lib/stripe'

export async function BillingDetailsCard(props: {
  card: PaymentMethod.Card | null
}) {
  const customer = await getCustomer()

  if (!customer) throw new Error('Customer not found')

  const addressParts = [
    customer.address?.line1,
    customer.address?.line2,
    customer.address?.city,
    customer.address?.postal_code,
    customer.address?.country,
  ]

  const addressValue = addressParts
    .filter(part => part !== undefined)
    .join(', ')

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Billing Details</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root>
          <Form.Label>Payment Method</Form.Label>
          <div className={styles.field}>
            <div className={styles.paymentMethod}>
              {props.card && (
                <>
                  <div
                    className={cn(
                      styles.card,
                      props.card.brand === 'mastercard' && styles.mastercard,
                      props.card.brand === 'visa' && styles.visa,
                    )}
                  >
                    {props.card.brand === 'mastercard' && (
                      <SiMastercard className={styles.icon} />
                    )}
                    {props.card.brand === 'visa' && (
                      <SiVisa className={styles.icon} />
                    )}
                  </div>
                  <span>····{props.card.last4}</span>
                </>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add card</Button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                  <PaymentMethodCard />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
          <Form.Label>Billing Address</Form.Label>
          <div className={styles.field}>
            <Input className="grow" readOnly type="text" value={addressValue} />
            <Dialog>
              <DialogTrigger asChild>
                <Button>Update</Button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                  <UpdateAddressCard address={customer.address} />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

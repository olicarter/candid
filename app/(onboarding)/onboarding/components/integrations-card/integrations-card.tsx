import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { SubmitButton } from '@/components/submit-button'
import { BackButton, type BackButtonProps } from '../back-button'
import styles from './integrations-card.module.css'
import { incrementOnboardingStep } from '../../actions/incrementOnboardingStep'
import { forwardRef } from 'react'

export interface IntegrationsCardProps {
  active: boolean
  onBack: BackButtonProps['onClick']
  onSubmit: Form.RootProps['onSubmit']
}

export const IntegrationsCard = forwardRef<
  HTMLDivElement,
  IntegrationsCardProps
>((props, ref) => {
  const tabIndex = props.active ? 0 : -1

  return (
    <Card.Root ref={ref}>
      <Card.Header>
        <Card.Title>Integrations</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={incrementOnboardingStep} onSubmit={props.onSubmit}>
          <Form.Label>Google Meet</Form.Label>
          <div className={styles.field}>
            <Input
              disabled
              readOnly
              tabIndex={tabIndex}
              type="text"
              value="Not connected"
            />
            <Button tabIndex={tabIndex}>Connect</Button>
          </div>
          <Form.Label>Slack</Form.Label>
          <div className={styles.field}>
            <Input
              disabled
              readOnly
              tabIndex={tabIndex}
              type="text"
              value="Not connected"
            />
            <Button tabIndex={tabIndex}>Connect</Button>
          </div>
          <Form.Label>Github</Form.Label>
          <div className={styles.field}>
            <Input
              disabled
              readOnly
              tabIndex={tabIndex}
              type="text"
              value="Not connected"
            />
            <Button tabIndex={tabIndex}>Connect</Button>
          </div>
          <Form.Footer>
            <BackButton onClick={props.onBack} tabIndex={tabIndex} />
            <SubmitButton
              formAction={incrementOnboardingStep}
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

IntegrationsCard.displayName = 'IntegrationsCard'

import { Plus } from 'lucide-react'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { IconButton } from '@/components/icon-button'
import { Input } from '@/components/input'
import { SubmitButton } from '@/components/submit-button'
import { updateAIPreferences } from '../../actions/updateAIPreferences'
import { BackButton, BackButtonProps } from '../back-button'
import styles from './ai-preferences-card.module.css'
import { forwardRef } from 'react'

export interface AIPreferencesCardProps {
  active: boolean
  onBack: BackButtonProps['onClick']
  onSubmit: Form.RootProps['onSubmit']
}

export const AIPreferencesCard = forwardRef<
  HTMLDivElement,
  AIPreferencesCardProps
>((props, ref) => {
  const tabIndex = props.active ? 0 : -1

  return (
    <Card.Root ref={ref}>
      <Card.Header>
        <Card.Title>AI Preferences</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={updateAIPreferences} onSubmit={props.onSubmit}>
          <Form.Label>Anonymization</Form.Label>
          <Input tabIndex={tabIndex} type="text" />
          <Form.Label>Sentiment Analysis</Form.Label>
          <Input tabIndex={tabIndex} type="text" />
          <Form.Label>Company Values</Form.Label>
          <div className={styles.field}>
            <Input placeholder="Value" tabIndex={tabIndex} type="text" />
            <Input placeholder="Description" tabIndex={tabIndex} type="text" />
            <IconButton icon={Plus} tabIndex={tabIndex} />
          </div>
          <Form.Footer>
            <BackButton onClick={props.onBack} tabIndex={tabIndex} />
            <SubmitButton
              formAction={updateAIPreferences}
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

AIPreferencesCard.displayName = 'AIPreferencesCard'

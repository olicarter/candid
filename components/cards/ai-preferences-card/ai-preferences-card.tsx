import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Input } from '@/components/input'
import { Plus } from 'lucide-react'
import { IconButton } from '@/components/icon-button'
import styles from './ai-preferences-card.module.css'

export function AIPreferencesCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>AI Preferences</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root>
          <Form.Label>Anonymization</Form.Label>
          <Input type="text" />
          <Form.Label>Sentiment Analysis</Form.Label>
          <Input type="text" />
          <Form.Label>Company Values</Form.Label>
          <div className={styles.field}>
            <Input placeholder="Value" type="text" />
            <Input placeholder="Description" type="text" />
            <IconButton icon={Plus} />
          </div>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

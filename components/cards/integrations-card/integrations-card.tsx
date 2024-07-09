import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import styles from './integrations-card.module.css'

export function IntegrationsCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Integrations</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root>
          <Form.Label>Google Meet</Form.Label>
          <div className={styles.field}>
            <Input disabled readOnly type="text" value="Not connected" />
            <Button>Connect</Button>
          </div>
          <Form.Label>Slack</Form.Label>
          <div className={styles.field}>
            <Input disabled readOnly type="text" value="Not connected" />
            <Button>Connect</Button>
          </div>
          <Form.Label>Github</Form.Label>
          <div className={styles.field}>
            <Input disabled readOnly type="text" value="Not connected" />
            <Button>Connect</Button>
          </div>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

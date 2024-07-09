import * as Card from '@/components/card'
import * as Form from '@/components/form'
import styles from './sentiment-card.module.css'

export function SentimentCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Sentiment</Card.Title>
        <Card.Description>
          The ratio of positive to critical feedback sent and received.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root>
          <Form.Label className={styles.label}>Sent</Form.Label>
          <div className={styles.bar}>
            <div style={{ width: '63%' }} />
            <div style={{ width: '37%' }} />
          </div>
          <Form.Label className={styles.label}>Received</Form.Label>
          <div className={styles.bar}>
            <div style={{ width: '42%' }} />
            <div style={{ width: '58%' }} />
          </div>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

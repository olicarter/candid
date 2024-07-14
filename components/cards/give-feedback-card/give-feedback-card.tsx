import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { DialogDescription, DialogTitle } from '@/components/dialog'
import { IconButton, IconButtonProps } from '@/components/icon-button'
import { ArrowLeftRight } from 'lucide-react'
import * as ProfileCard from '@/components/profile-card'
import { Button } from '@/components/button'
import { Textarea } from '@/components/textarea'
import { DialogClose } from '@/components/dialog'
import styles from './give-feedback-card.module.css'
import { SubmitButton } from '@/components/submit-button'

export function GiveFeedbackCard(props: {
  onRecipientChangeClick?: IconButtonProps['onClick']
  recipient: { firstName: string; jobTitle: string; avatarUrl: string }
}) {
  return (
    <Card.Root>
      <Card.Header>
        <DialogTitle asChild>
          <Card.Title>Give Feedback</Card.Title>
        </DialogTitle>
        <DialogDescription asChild>
          <Card.Description>
            Be concise and don’t worry about tone, we never send feedback as
            it’s written but deliver a summary of common themes from all
            feedback over a period.
          </Card.Description>
        </DialogDescription>
      </Card.Header>
      <Card.Content>
        <Form.Root>
          <Form.Label>Recipient</Form.Label>
          <ProfileCard.Root>
            <ProfileCard.Avatar src={props.recipient.avatarUrl} />
            <ProfileCard.Title>{props.recipient.firstName}</ProfileCard.Title>
            <ProfileCard.Description>
              {props.recipient.firstName}
            </ProfileCard.Description>
            <ProfileCard.Button asChild>
              <IconButton
                icon={ArrowLeftRight}
                onClick={props.onRecipientChangeClick}
              />
            </ProfileCard.Button>
          </ProfileCard.Root>
          <Form.Label>Feedback</Form.Label>
          <Textarea required rows={6} />
          <Form.Label>Sentiment</Form.Label>
          <div className={styles.sentimentButtons}>
            <Button disabled variant="red">
              Critical
            </Button>
            <Button disabled variant="amber">
              Mixed
            </Button>
            <Button disabled variant="green">
              Positive
            </Button>
          </div>
          <Form.Footer>
            <DialogClose asChild>
              <Button variant="light">Cancel</Button>
            </DialogClose>
            <SubmitButton>Submit feedback</SubmitButton>
          </Form.Footer>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

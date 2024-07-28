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
import { createFeedback } from '@/actions/createFeedback'
import { Tables } from '@/types/supabase'

export function GiveFeedbackCard(props: {
  onRecipientChangeClick?: IconButtonProps['onClick']
  recipient: Pick<Tables<'profiles'>, 'id' | 'avatar_url' | 'full_name'>
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
        <Form.Root action={createFeedback}>
          <input type="hidden" name="recipient" value={props.recipient.id} />
          <Form.Label>Recipient</Form.Label>
          <ProfileCard.Root>
            <ProfileCard.Avatar src={props.recipient.avatar_url} />
            <ProfileCard.Title>{props.recipient.full_name}</ProfileCard.Title>
            <ProfileCard.Description>
              {props.recipient.full_name}
            </ProfileCard.Description>
            <ProfileCard.Button asChild>
              <IconButton
                icon={ArrowLeftRight}
                onClick={props.onRecipientChangeClick}
              />
            </ProfileCard.Button>
          </ProfileCard.Root>
          <Form.Label>Feedback</Form.Label>
          <Textarea autoFocus name="content" required rows={6} />
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
            <SubmitButton
              formAction={createFeedback}
              pendingText="Submitting feedback"
            >
              Submit feedback
            </SubmitButton>
          </Form.Footer>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

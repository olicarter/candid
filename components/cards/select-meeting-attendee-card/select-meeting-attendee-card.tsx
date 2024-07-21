'use client'

import { ArrowLeftRight } from 'lucide-react'
import { IconButton } from '@/components/icon-button'
import * as ProfileCard from '@/components/profile-card'
import { GiveFeedbackCard } from '@/components/cards/give-feedback-card'
import { useState } from 'react'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { DialogDescription, DialogTitle } from '@/components/dialog'
import { format } from 'date-fns'
import styles from './select-meeting-attendee-card.module.css'
import { Tables } from '@/types/supabase'

export function SelectMeetingAttendeeCard(props: {
  meeting: {
    name: string
    startDate: string
    endDate: string
    attendees: Pick<
      Tables<'profiles'>,
      'id' | 'avatar_url' | 'full_name' | 'job_title'
    >[]
  }
}) {
  const [recipientId, setRecipientId] = useState<string | null>(null)

  const recipient = props.meeting.attendees.find(
    user => user.id === recipientId,
  )

  if (recipient) {
    return (
      <GiveFeedbackCard
        onRecipientChangeClick={() => setRecipientId(null)}
        recipient={recipient}
      />
    )
  }

  return (
    <Card.Root>
      <Card.Header>
        <DialogTitle asChild>
          <Card.Title>Select Meeting Attendee</Card.Title>
        </DialogTitle>
        <DialogDescription asChild>
          <Card.Description>
            Select an attendee to give feedback to.
          </Card.Description>
        </DialogDescription>
      </Card.Header>
      <Card.Content>
        <Form.Root>
          <Form.Label>Meeting</Form.Label>
          <div className={styles.recentMeeting}>
            <div>
              <p className={styles.name}>{props.meeting.name}</p>
              <p className={styles.time}>
                {format(props.meeting.startDate, 'h:mm')} -{' '}
                {format(props.meeting.endDate, 'h:mm a')}
              </p>
            </div>
            <IconButton icon={ArrowLeftRight} />
          </div>
          <Form.Label>Attendees</Form.Label>
          <ul className={styles.attendeesList}>
            {props.meeting.attendees.map(attendee => (
              <ProfileCard.Root asChild key={attendee.id}>
                <button onClick={() => setRecipientId(attendee.id)}>
                  <ProfileCard.Avatar src={attendee.avatar_url} />
                  <ProfileCard.Title>{attendee.full_name}</ProfileCard.Title>
                  <ProfileCard.Description>
                    {attendee.job_title}
                  </ProfileCard.Description>
                </button>
              </ProfileCard.Root>
            ))}
          </ul>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

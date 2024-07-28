import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Avatar } from '@/components/avatar'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/dialog'
import { Fragment } from 'react'
import { format, isToday, isYesterday } from 'date-fns'
import styles from './recent-meetings-card.module.css'
import { type Tables } from '@/types/supabase'
import * as ProfileCard from '@/components/profile-card'
import { Button } from '@/components/button'
import { ArrowRight } from 'lucide-react'
import { GiveFeedbackCard } from '../give-feedback-card'

interface Meeting {
  id: string
  name: string
  startDate: string
  endDate: string
  attendees: Pick<
    Tables<'profiles'>,
    'id' | 'avatar_url' | 'full_name' | 'job_title'
  >[]
}

const data: Meeting[] = [
  {
    id: 'd9f61cf2-465a-5503-8d1d-0e71a11e5702',
    name: 'Retro',
    startDate: '2024-07-07T06:30:00.000Z',
    endDate: '2024-07-07T08:30:00.000Z',
    attendees: [
      {
        id: 'c4553796-0547-5f69-90ba-06ea2424297e',
        full_name: 'Davis',
        job_title: 'Front-End Engineer',
        avatar_url: '/davis.jpg',
      },
      {
        id: '4a4d0fb8-c12b-587f-b7dd-4d5f00690936',
        full_name: 'Kaylynn',
        job_title: 'Full-Stack Engineer',
        avatar_url: '/kaylynn.jpg',
      },
      {
        id: 'a291a7d2-ac84-5f7a-88b0-d695aff4dc50',
        full_name: 'Jaydon',
        job_title: 'UI/UX Designer',
        avatar_url: '/jaydon.jpg',
      },
      {
        id: '6b58d8f8-01fd-510f-b00b-24303649868d',
        full_name: 'Ann',
        job_title: 'Engineering Manager',
        avatar_url: '/ann.jpg',
      },
      {
        id: '2eacbc79-2cd8-52ab-90f6-47abf123ff18',
        full_name: 'Justin',
        job_title: 'CTO',
        avatar_url: '/justin.jpg',
      },
    ],
  },
  {
    id: '15f3451e-1942-532f-bffd-8ec4548fd097',
    name: 'Standup',
    startDate: '2024-07-07T06:00:00.000Z',
    endDate: '2024-07-07T06:15:00.000Z',
    attendees: [
      {
        id: 'c4553796-0547-5f69-90ba-06ea2424297e',
        full_name: 'Davis',
        job_title: 'Front-End Engineer',
        avatar_url: '/davis.jpg',
      },
      {
        id: '4a4d0fb8-c12b-587f-b7dd-4d5f00690936',
        full_name: 'Kaylynn',
        job_title: 'Full-Stack Engineer',
        avatar_url: '/kaylynn.jpg',
      },
      {
        id: 'a291a7d2-ac84-5f7a-88b0-d695aff4dc50',
        full_name: 'Jaydon',
        job_title: 'UI/UX Designer',
        avatar_url: '/jaydon.jpg',
      },
      {
        id: '6b58d8f8-01fd-510f-b00b-24303649868d',
        full_name: 'Ann',
        job_title: 'Engineering Manager',
        avatar_url: '/ann.jpg',
      },
    ],
  },
  {
    id: 'b7a4428a-3ee6-5316-9cdf-1890888dcfef',
    name: 'Standup',
    startDate: '2024-07-06T06:00:00.000Z',
    endDate: '2024-07-06T06:15:00.000Z',
    attendees: [
      {
        id: 'c4553796-0547-5f69-90ba-06ea2424297e',
        full_name: 'Davis',
        job_title: 'Front-End Engineer',
        avatar_url: '/davis.jpg',
      },
      {
        id: '4a4d0fb8-c12b-587f-b7dd-4d5f00690936',
        full_name: 'Kaylynn',
        job_title: 'Full-Stack Engineer',
        avatar_url: '/kaylynn.jpg',
      },
      {
        id: 'a291a7d2-ac84-5f7a-88b0-d695aff4dc50',
        full_name: 'Jaydon',
        job_title: 'UI/UX Designer',
        avatar_url: '/jaydon.jpg',
      },
      {
        id: '6b58d8f8-01fd-510f-b00b-24303649868d',
        full_name: 'Ann',
        job_title: 'Engineering Manager',
        avatar_url: '/ann.jpg',
      },
    ],
  },
]

export function RecentMeetingsCard() {
  const meetingsGroupedByDate = data.reduce<Record<string, Meeting[]>>(
    (acc, meeting) => {
      const date = new Date(meeting.startDate).toDateString()
      acc[date] = acc[date] || []
      acc[date].push(meeting)
      return acc
    },
    {},
  )
  const dates = Object.keys(meetingsGroupedByDate)

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Recent Meetings</Card.Title>
        <Card.Description>
          Select a recent meeting to give feedback to attendees.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root>
          {dates.map((date, index) => {
            const label = (() => {
              // if (isToday(new Date(date))) {
              if (index === 0) {
                return 'Today'
                // } else if (isYesterday(new Date(date))) {
              } else if (index === 1) {
                return 'Yesterday'
              }
              return format(date, "iiii',' do MMMM")
            })()
            return (
              <Fragment key={date}>
                <Form.Label>{label}</Form.Label>
                <ul className={styles.meetingsList}>
                  {meetingsGroupedByDate[date].map(meeting => (
                    <RecentMeeting key={meeting.id} meeting={meeting} />
                  ))}
                </ul>
              </Fragment>
            )
          })}
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

function RecentMeeting(props: { meeting: Meeting }) {
  return (
    <details className={styles.recentMeeting}>
      <summary>
        <div>
          <p className={styles.name}>{props.meeting.name}</p>
          <p className={styles.time}>
            {format(props.meeting.startDate, 'h:mm')} -{' '}
            {format(props.meeting.endDate, 'h:mm a')}
          </p>
        </div>
        <ul className={styles.avatars}>
          {props.meeting.attendees.map(attendee => (
            <Avatar
              className={styles.avatar}
              key={attendee.id}
              src={attendee.avatar_url}
            />
          ))}
        </ul>
      </summary>
      <ul className={styles.attendeesList}>
        {props.meeting.attendees.map(attendee => (
          <Dialog key={attendee.id}>
            <li>
              <DialogTrigger asChild>
                <button
                // onClick={() => setRecipientId(attendee.id)}
                >
                  <Avatar className={styles.avatar} src={attendee.avatar_url} />
                  <h5 className={styles.attendeeName}>{attendee.full_name}</h5>
                  <p>{attendee.job_title}</p>
                  <ArrowRight className={styles.icon} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <GiveFeedbackCard
                  // onRecipientChangeClick={() => setRecipientId(null)}
                  recipient={attendee}
                />
              </DialogContent>
            </li>
          </Dialog>
        ))}
      </ul>
    </details>
  )
}

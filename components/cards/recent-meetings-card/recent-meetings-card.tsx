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
import { SelectMeetingAttendeeCard } from '@/components/cards/select-meeting-attendee-card'
import { Fragment } from 'react'
import { format, isToday, isYesterday } from 'date-fns'
import styles from './recent-meetings-card.module.css'

interface Meeting {
  id: string
  name: string
  startDate: string
  endDate: string
  attendees: {
    id: string
    firstName: string
    avatarUrl: string
    jobTitle: string
  }[]
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
        firstName: 'Davis',
        jobTitle: 'Front-End Engineer',
        avatarUrl: '/davis.jpg',
      },
      {
        id: '4a4d0fb8-c12b-587f-b7dd-4d5f00690936',
        firstName: 'Kaylynn',
        jobTitle: 'Full-Stack Engineer',
        avatarUrl: '/kaylynn.jpg',
      },
      {
        id: 'a291a7d2-ac84-5f7a-88b0-d695aff4dc50',
        firstName: 'Jaydon',
        jobTitle: 'UI/UX Designer',
        avatarUrl: '/jaydon.jpg',
      },
      {
        id: '6b58d8f8-01fd-510f-b00b-24303649868d',
        firstName: 'Ann',
        jobTitle: 'Engineering Manager',
        avatarUrl: '/ann.jpg',
      },
      {
        id: '2eacbc79-2cd8-52ab-90f6-47abf123ff18',
        firstName: 'Justin',
        jobTitle: 'CTO',
        avatarUrl: '/justin.jpg',
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
        firstName: 'Davis',
        jobTitle: 'Front-End Engineer',
        avatarUrl: '/davis.jpg',
      },
      {
        id: '4a4d0fb8-c12b-587f-b7dd-4d5f00690936',
        firstName: 'Kaylynn',
        jobTitle: 'Full-Stack Engineer',
        avatarUrl: '/kaylynn.jpg',
      },
      {
        id: 'a291a7d2-ac84-5f7a-88b0-d695aff4dc50',
        firstName: 'Jaydon',
        jobTitle: 'UI/UX Designer',
        avatarUrl: '/jaydon.jpg',
      },
      {
        id: '6b58d8f8-01fd-510f-b00b-24303649868d',
        firstName: 'Ann',
        jobTitle: 'Engineering Manager',
        avatarUrl: '/ann.jpg',
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
        firstName: 'Davis',
        jobTitle: 'Front-End Engineer',
        avatarUrl: '/davis.jpg',
      },
      {
        id: '4a4d0fb8-c12b-587f-b7dd-4d5f00690936',
        firstName: 'Kaylynn',
        jobTitle: 'Full-Stack Engineer',
        avatarUrl: '/kaylynn.jpg',
      },
      {
        id: 'a291a7d2-ac84-5f7a-88b0-d695aff4dc50',
        firstName: 'Jaydon',
        jobTitle: 'UI/UX Designer',
        avatarUrl: '/jaydon.jpg',
      },
      {
        id: '6b58d8f8-01fd-510f-b00b-24303649868d',
        firstName: 'Ann',
        jobTitle: 'Engineering Manager',
        avatarUrl: '/ann.jpg',
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
          {dates.map(date => {
            const label = (() => {
              if (isToday(new Date(date))) {
                return 'Today'
              } else if (isYesterday(new Date(date))) {
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
    <Dialog>
      <DialogTrigger asChild>
        <button className={styles.recentMeeting}>
          <div>
            <p className={styles.name}>{props.meeting.name}</p>
            <p className={styles.time}>
              {format(props.meeting.startDate, 'h:mm')} -{' '}
              {format(props.meeting.endDate, 'h:mm a')}
            </p>
          </div>
          <ul className={styles.attendeeList}>
            {props.meeting.attendees.map(attendee => (
              <Avatar
                className={styles.avatar}
                key={attendee.id}
                src={attendee.avatarUrl}
              />
            ))}
          </ul>
        </button>
      </DialogTrigger>
      <DialogContent>
        <SelectMeetingAttendeeCard meeting={props.meeting} />
      </DialogContent>
    </Dialog>
  )
}

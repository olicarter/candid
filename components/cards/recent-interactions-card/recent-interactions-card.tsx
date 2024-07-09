import * as Card from '@/components/card'
import * as ProfileCard from '@/components/profile-card'
import styles from './recent-interactions-card.module.css'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/dialog'
import { GiveFeedbackCard } from '@/components/cards/give-feedback-card'

const data = [
  {
    id: 'ffa9ee3b-6b1e-5122-afa6-a36960a20e68',
    firstName: 'Ann',
    jobTitle: 'Engineering Manager',
    avatarUrl: '/ann.jpg',
  },
  {
    id: 'e6e2a24a-e207-51d0-b362-fbfc28a2da7e',
    firstName: 'Davis',
    jobTitle: 'Front-End Engineer',
    avatarUrl: '/davis.jpg',
  },
  {
    id: 'f4a1d3f4-2c3f-5e6e-8f3c-3b4a8e7f2c0b',
    firstName: 'Kaylynn',
    jobTitle: 'Full-Stack Engineer',
    avatarUrl: '/kaylynn.jpg',
  },
  {
    id: '59c659d5-696e-5cd2-826d-d4080d0fe0f5',
    firstName: 'Jaydon',
    jobTitle: 'UI/UX Designer',
    avatarUrl: '/jaydon.jpg',
  },
]

export function RecentInteractionsCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Recent Interactions</Card.Title>
        <Card.Description>
          Give feedback to peers while the details are clear in your mind.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <ul className={styles.list}>
          {data.map(user => (
            <Dialog key={user.id}>
              <DialogTrigger asChild>
                <ProfileCard.Root asChild key={user.id}>
                  <button>
                    <ProfileCard.Avatar src={user.avatarUrl} />
                    <ProfileCard.Title>{user.firstName}</ProfileCard.Title>
                    <ProfileCard.Description>
                      {user.jobTitle}
                    </ProfileCard.Description>
                  </button>
                </ProfileCard.Root>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                  <GiveFeedbackCard recipient={user} />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          ))}
        </ul>
      </Card.Content>
    </Card.Root>
  )
}

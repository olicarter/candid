import * as Card from '@/components/card'
import * as ProfileCard from '@/components/profile-card'
import styles from './recent-interactions-card.module.css'
import { Dialog, DialogContent, DialogTrigger } from '@/components/dialog'
import { GiveFeedbackCard } from '@/components/cards/give-feedback-card'
import { Tables } from '@/types/supabase'

export function RecentInteractionsCard(props: {
  profiles: Tables<'profiles'>[]
}) {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Recent Interactions</Card.Title>
        <Card.Description>
          Give feedback to peers while the details are clear in your mind.
        </Card.Description>
      </Card.Header>
      <Card.Content className={styles.content}>
        <ul className={styles.list}>
          {props.profiles.map(profile => (
            <Dialog key={profile.id}>
              <DialogTrigger asChild>
                <ProfileCard.Root asChild key={profile.id}>
                  <button>
                    <ProfileCard.Avatar src={profile.avatar_url} />
                    <ProfileCard.Title>{profile.full_name}</ProfileCard.Title>
                    <ProfileCard.Description>
                      {profile.job_title}
                    </ProfileCard.Description>
                  </button>
                </ProfileCard.Root>
              </DialogTrigger>
              <DialogContent>
                <GiveFeedbackCard recipient={profile} />
              </DialogContent>
            </Dialog>
          ))}
        </ul>
      </Card.Content>
    </Card.Root>
  )
}

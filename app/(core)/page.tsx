import { getUser } from '@/lib/auth'
import { RecentInteractionsCard } from '@/components/cards/recent-interactions-card'
import { RecentMeetingsCard } from '@/components/cards/recent-meetings-card'
import { SentimentCard } from '@/components/cards/sentiment-card'
import { SummaryCard } from '@/components/cards/summary-card'
import { ValuesCard } from '@/components/cards/values-card'
import styles from './page.module.css'

export default async function IndexPage() {
  const user = await getUser()

  if (!user) return null

  return (
    <div className={styles.main}>
      <div>
        <SummaryCard />
        <ValuesCard />
        <SentimentCard />
      </div>
      <div>
        <RecentInteractionsCard />
        <RecentMeetingsCard />
      </div>
    </div>
  )
}

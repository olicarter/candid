import * as Card from '@/components/card'

export function SummaryCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Summary</Card.Title>
        <Card.Description>
          A concise overview of your recent feedback
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p>
          Over the past month, you&apos;ve received a mix of positive and
          constructive feedback. Your colleagues have praised your exceptional
          teamwork and dedication, noting that your positive attitude has been a
          great boost to morale. However, some team members have suggested that
          your communication could be more frequent and detailed to improve
          project collaboration. While your innovative problem-solving skills
          have been appreciated, there were a few instances where a more
          traditional approach might have been more effective. Overall, your
          contributions are highly valued, and with some adjustments, you can
          further enhance your impact on the team.
        </p>
      </Card.Content>
    </Card.Root>
  )
}

import * as Card from '@/components/card'
import { signOut } from '@/actions/signOut'
import { Button } from '@/components/button'
import * as Form from '@/components/form'

export function AccountActionsCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Actions</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={signOut}>
          <Form.Label>Sign out</Form.Label>
          <Button>Sign out</Button>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

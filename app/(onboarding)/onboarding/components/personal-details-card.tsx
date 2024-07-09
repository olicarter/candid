import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { AvatarInput } from '@/components/inputs/avatar-input'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/input'
import { updateProfile } from '../actions/updateProfile'
import { type Tables } from '@/types/supabase'
import { forwardRef } from 'react'

interface PersonalDetailsCardProps {
  onSubmit: Form.RootProps['onSubmit']
  profile: Tables<'profiles'> | null
}

export const PersonalDetailsCard = forwardRef<
  HTMLDivElement,
  PersonalDetailsCardProps
>((props, ref) => (
  <Card.Root ref={ref}>
    <Card.Header>
      <Card.Title>Personal Details</Card.Title>
      <Card.Description>Lorem ipsum foo bar.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Form.Root action={updateProfile} onSubmit={props.onSubmit}>
        <Form.Label>Full Name</Form.Label>
        <Input
          autoComplete="name"
          defaultValue={props.profile?.full_name ?? undefined}
          name="full_name"
          required
          type="text"
        />
        <Form.Label>Job Title</Form.Label>
        <Input
          autoComplete="organization-title"
          defaultValue={props.profile?.job_title ?? undefined}
          name="job_title"
          type="text"
        />
        <Form.Label>Avatar</Form.Label>
        <AvatarInput defaultValue={props.profile?.avatar_url ?? undefined} />
        <Form.Footer>
          <SubmitButton formAction={updateProfile} pendingText="Saving...">
            Continue
          </SubmitButton>
        </Form.Footer>
      </Form.Root>
    </Card.Content>
  </Card.Root>
))

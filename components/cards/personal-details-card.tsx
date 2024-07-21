'use client'

import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Button } from '@/components/button'
import { Tables } from '@/types/supabase'
import { useForm } from '@/hooks/useForm'
import { updateProfile } from '@/actions/updateProfile'
import { UserIdentity } from '@supabase/supabase-js'
import { SubmitButton } from '@/components/submit-button'
import { AvatarInput } from '@/components/inputs/avatar-input'
import { UserIdentitiesInput } from '@/components/inputs/user-identities-input/user-identities-input'
import { Input } from '@/components/input'

interface PersonalDetailsCardProps {
  profile: Tables<'profiles'> | null
  userIdentities?: UserIdentity[]
}

export function PersonalDetailsCard(props: PersonalDetailsCardProps) {
  const { formValues, handleChange, hasFormChanged, resetField, resetForm } =
    useForm({
      avatar_url: props.profile?.avatar_url ?? '',
      full_name: props.profile?.full_name ?? '',
      job_title: props.profile?.job_title ?? '',
    })

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Personal Details</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={updateProfile}>
          <Form.Label>Full Name</Form.Label>
          <Input
            autoComplete="name"
            name="full_name"
            onChange={handleChange}
            type="text"
            value={formValues.full_name}
          />
          <Form.Label>Job Title</Form.Label>
          <Input
            autoComplete="organization-title"
            name="job_title"
            onChange={handleChange}
            type="text"
            value={formValues.job_title}
          />
          <Form.Label>Avatar</Form.Label>
          <AvatarInput
            onUpload={value => resetField('avatar_url', value)}
            value={formValues.avatar_url}
          />
          <Form.Label>Sign In Methods</Form.Label>
          <UserIdentitiesInput userIdentities={props.userIdentities} />
          {hasFormChanged && (
            <Form.Footer>
              <SubmitButton
                formAction={updateProfile}
                pendingText="Saving changes..."
              >
                Save changes
              </SubmitButton>
              <Button onClick={resetForm} type="button" variant="light">
                Revert
              </Button>
            </Form.Footer>
          )}
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

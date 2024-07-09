'use client'

import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Input } from '@/components/input'
import { Tables } from '@/types/supabase'
import { useForm } from '@/hooks/useForm'
import { Button } from '@/components/button'
import { updateOrganization } from '@/actions/updateOrganization'
import { SubmitButton } from '@/components/submit-button'

export interface OrganizationDetailsCardProps {
  className?: string
  organization: Tables<'organizations'> | null
}

export function OrganizationDetailsCard(props: OrganizationDetailsCardProps) {
  const { formValues, handleChange, hasFormChanged, resetForm } = useForm({
    name: props.organization?.name ?? '',
  })

  return (
    <Card.Root className={props.className}>
      <Card.Header>
        <Card.Title>Organization Details</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={updateOrganization}>
          <Form.Label>Name</Form.Label>
          <Input
            autoComplete="organization"
            name="name"
            onChange={handleChange}
            type="text"
            value={formValues.name}
          />
          {hasFormChanged && (
            <Form.Footer>
              <Button onClick={resetForm} type="button" variant="light">
                Revert
              </Button>
              <SubmitButton pendingText="Saving changes...">
                Save changes
              </SubmitButton>
            </Form.Footer>
          )}
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

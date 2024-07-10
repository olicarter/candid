import { type Tables } from '@/types/supabase'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { Input } from '@/components/input'
import { SubmitButton } from '@/components/submit-button'
import { createOrganization } from '../actions/createOrganization'
import { BackButton, type BackButtonProps } from './back-button'
import { forwardRef } from 'react'

export interface OrganizationDetailsCardProps {
  active: boolean
  onBack: BackButtonProps['onClick']
  onSubmit: Form.RootProps['onSubmit']
  organization: Tables<'organizations'> | null
}

export const OrganizationDetailsCard = forwardRef<
  HTMLDivElement,
  OrganizationDetailsCardProps
>((props, ref) => {
  const tabIndex = props.active ? 0 : -1

  return (
    <Card.Root ref={ref}>
      <Card.Header>
        <Card.Title>Organization Details</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root action={createOrganization} onSubmit={props.onSubmit}>
          <Form.Label>Name</Form.Label>
          <Input
            autoComplete="organization"
            defaultValue={props.organization?.name}
            name="name"
            required
            tabIndex={tabIndex}
            type="text"
          />
          <Form.Footer>
            <BackButton onClick={props.onBack} tabIndex={tabIndex} />
            <SubmitButton
              formAction={createOrganization}
              pendingText="Saving..."
              tabIndex={tabIndex}
            >
              Continue
            </SubmitButton>
          </Form.Footer>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
})

OrganizationDetailsCard.displayName = 'OrganizationDetailsCard'

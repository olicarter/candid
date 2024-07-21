'use client'

import { useRef } from 'react'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { type Enums } from '@/types/supabase'
import { updateProfileTheme } from '@/actions/updateProfileTheme'
import { Select } from '@/components/select'

export function ThemeSelectionCard(props: { theme: Enums<'theme'> }) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Theme</Card.Title>
        <Card.Description>Lorem ipsum foo bar.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Form.Root
          action={async (formData: FormData) => {
            const theme = formData.get('theme') as string
            document.documentElement.setAttribute('data-theme', theme)
            await updateProfileTheme(formData)
          }}
          ref={formRef}
        >
          <Form.Label>Theme</Form.Label>
          <Select
            defaultValue={props.theme}
            name="theme"
            onChange={() => {
              formRef.current?.requestSubmit()
            }}
          >
            <option value="emerald">Emerald</option>
            <option value="orange">Orange</option>
            <option value="pro">Pro</option>
          </Select>
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

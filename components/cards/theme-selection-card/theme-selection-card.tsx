'use client'

import { useRef } from 'react'
import * as Card from '@/components/card'
import * as Form from '@/components/form'
import { type Enums } from '@/types/supabase'
import { updateProfileTheme } from '@/actions/updateProfileTheme'
import styles from './theme-selection-card.module.css'

const themes = ['emerald', 'orange', 'pro']
const variations = ['light', 'dark', 'system']

export default function ThemeSelectionCard(props: { theme: Enums<'theme'> }) {
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
          className={styles.form}
          ref={formRef}
        >
          {/* <Form.Label>Color</Form.Label> */}
          <div className={styles.themeButtons}>
            {themes.map(theme => (
              <div className={styles[theme]} key={theme}>
                <input
                  defaultChecked={props.theme === theme}
                  name="theme"
                  onClick={() => formRef.current?.requestSubmit()}
                  type="radio"
                  value={theme}
                />
                <label className={styles.label}>{theme}</label>
                <ul className={styles.palette}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* <Form.Label>Light/Dark</Form.Label>
          <div className={styles.themeButtons}>
            {variations.map(variation => (
              <div className={styles[variation]} key={variation}>
                <input
                  name="variation"
                  onClick={() => formRef.current?.requestSubmit()}
                  type="radio"
                  value={variation}
                />
                <label className={styles.label}>{variation}</label>
                <ul className={styles.palette}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} />
                  ))}
                </ul>
              </div>
            ))}
          </div> */}
        </Form.Root>
      </Card.Content>
    </Card.Root>
  )
}

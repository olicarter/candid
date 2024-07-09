import { type ReactNode } from 'react'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Nav } from '@/components/nav'
import styles from './layout.module.css'

export default async function NewOrganizationLayout(props: {
  children: ReactNode
}) {
  const user = await getUser()
  if (!user) redirect('/')
  return (
    <>
      <div className={styles.nav}>
        <Nav />
      </div>
      {props.children}
    </>
  )
}

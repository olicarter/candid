import { ReactNode } from 'react'

export default function ComponentsLayout(props: { children: ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center w-screen">
      {props.children}
    </div>
  )
}

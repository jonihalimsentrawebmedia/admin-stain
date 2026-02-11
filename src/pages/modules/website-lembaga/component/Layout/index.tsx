import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const LayoutWebsiteInstitution = (props: Props) => {
  const { children } = props
  return (
    <>
      <div className={'w-7xl mx-auto'}>{children}</div>
    </>
  )
}

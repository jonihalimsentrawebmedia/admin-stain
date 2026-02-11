import { HeaderLayoutInstitution } from '@/pages/modules/website-lembaga/component/Layout/header'
import { Outlet } from 'react-router-dom'

export const LayoutWebsiteInstitution = () => {
  return (
    <>
      <HeaderLayoutInstitution />
      <div className={'w-7xl mx-auto'}>
        <Outlet />
      </div>
    </>
  )
}

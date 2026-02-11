import { HeaderLayoutInstitution } from '@/pages/modules/website-lembaga/component/Layout/header'
import { Outlet } from 'react-router-dom'

export const LayoutWebsiteInstitution = () => {
  return (
    <div className="w-full h-full overflow-y-auto ">
      <HeaderLayoutInstitution />
      <div className={'w-7xl mx-auto h-auto py-6 px-4 '}>
        <Outlet />
      </div>
    </div>
  )
}

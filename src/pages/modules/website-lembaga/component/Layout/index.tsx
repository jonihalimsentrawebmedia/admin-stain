import { HeaderLayoutInstitution } from '@/pages/modules/website-lembaga/component/Layout/header'
import { Outlet } from 'react-router-dom'

export const LayoutWebsiteInstitution = () => {
  return (
    <div className="w-full max-w-7xl mx-auto h-full overflow-y-auto ">
      <HeaderLayoutInstitution />
      <div className={'max-w-7xl w-full mx-auto  py-6 px-8 '}>
        <Outlet />
      </div>
    </div>
  )
}

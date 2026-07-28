import { Outlet } from 'react-router-dom'
import { HeaderLayoutPPID } from './header'
import { HeaderMenu } from './header/HeaderMenu'

export const LayoutWebsitePPID = () => {
  return (
    <div className="w-full max-w-full mx-auto h-full overflow-y-auto relative">
      <div className="fixed w-full z-50">
        <HeaderLayoutPPID />
        <HeaderMenu />
      </div>
      <div className={'max-w-7xl w-full mx-auto py-4 sm:py-6 px-3 sm:px-8 pt-20 lg:pt-40'}>
        <Outlet />
      </div>
    </div>
  )
}

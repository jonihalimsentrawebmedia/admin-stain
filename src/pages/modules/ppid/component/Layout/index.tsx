import { Outlet } from 'react-router-dom'
import { HeaderLayoutPPID } from './header'
import { HeaderMenu } from './header/HeaderMenu'

export const LayoutWebsitePPID = () => {
  return (
    <div className="w-full max-w-[1920px] mx-auto h-full overflow-y-auto ">
      <HeaderLayoutPPID />
      <HeaderMenu />
      <div className={'max-w-7xl w-full mx-auto  py-6 px-8 '}>
        <Outlet />
      </div>
    </div>
  )
}

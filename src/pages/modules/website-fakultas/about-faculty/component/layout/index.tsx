import { Outlet } from 'react-router-dom'
import Menu from './menu'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { UseGetSessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'

const LayoutFaculty = () => {
  const { session } = UseGetSessionFaculty()

  return (
    <div className="space-y-8">
      <ButtonTitleGroup buttonGroup={[]} label="Detail Program Studi" isBack />
      <div className="flex gap-4 flex-col">
        <div>
          <div>
            <div className="text-[#999999] text-sm">Fakultas</div>
            <div className="text-primary font-medium text-3xl">{session?.nama_fakultas}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 h-full relative w-full">
        <Menu />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutFaculty

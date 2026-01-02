import { Outlet } from 'react-router-dom'
import Menu from './Menu'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'

const LayoutProgramStudy = () => {
  return (
    <div className="space-y-8">
      <ButtonTitleGroup buttonGroup={[]} label="Detail Program Studi" isBack />
      <div className="flex gap-4 flex-col">
        <div>
          <div>
            <div className="text-[#999999] text-sm">Program Studi</div>
            <div className="text-green-600 font-medium text-3xl">12345</div>
          </div>
        </div>
        <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-4">
          <div>
            <div className="text-[#999999] text-sm">Fakultas Asal</div>
            <div className=""> Fakultas Ilmu Budaya</div>
          </div>
          <div>
            <div className="text-[#999999] text-sm">Jenjang Pendidikan</div>
            <div className=""> S1 - Sarjana</div>
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

export default LayoutProgramStudy

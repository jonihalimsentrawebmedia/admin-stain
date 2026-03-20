import { Outlet } from 'react-router-dom'
import Menu from './menu.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import UseGetSatuanOrganisasiDetail from '@/pages/modules/settings/controller/useGetSatuanOrganisasiDetail.tsx'

const LayoutStudyProgram = () => {
  const { satuanOrganisasi } = UseGetSatuanOrganisasiDetail({
    kelompok: 'PRODI',
  })

  return (
    <div className="space-y-8">
      <ButtonTitleGroup buttonGroup={[]} label="Detail Program Studi" isBack />
      <div className="flex gap-4 flex-col">
        <div>
          <div>
            <div className="text-[#999999] text-sm">Prodi</div>
            <div className="text-primary font-medium text-3xl">{satuanOrganisasi?.nama}</div>
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

export default LayoutStudyProgram

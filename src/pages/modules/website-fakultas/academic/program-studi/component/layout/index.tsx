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
        <div className={'grid grid-cols-2 gap-4'}>
          <div className={'col-span-2'}>
            <div className="text-[#999999] text-sm">Prodi</div>
            <div className="text-primary font-medium text-3xl">{satuanOrganisasi?.nama}</div>
          </div>
          <div className={'col-span-1'}>
            <div className="text-[#999999] text-sm">Fakultas Asal</div>
            <div className="text-primary font-medium text-xl">{satuanOrganisasi?.nama_parent}</div>
          </div>
          <div className={'col-span-1'}>
            <div className="text-[#999999] text-sm">Jenjang</div>
            <div className="text-primary font-medium text-xl">
              {satuanOrganisasi?.nama_jenjang_pendidikan}({satuanOrganisasi?.kode_jenjang})
            </div>
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

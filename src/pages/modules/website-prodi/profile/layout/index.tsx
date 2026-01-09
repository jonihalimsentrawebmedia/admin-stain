import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetProfileProdi } from '../hooks/index'
import { Outlet } from 'react-router-dom'
import { SideMenuProfile } from '@/pages/modules/website-prodi/profile/layout/sideMenu.tsx'
import { UseGetProdiSession } from '@/pages/modules/website-prodi/hooks'

export const ProfileProdiLayout = () => {
  const { profileProdi } = UseGetProfileProdi()
  const { session } = UseGetProdiSession()
  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup label={'Detail Program Studi'} buttonGroup={[]} />
        <div className="flex flex-col gap-1.5">
          <p className="text-gray-500 text-sm">Program Studi</p>
          <p className="text-2xl font-semibold text-primary">{profileProdi?.nama}</p>
        </div>

        <div className="grid grid-cols-2">
          <div className={'flex flex-col gap-1'}>
            <p className="text-gray-500 text-sm">Fakultas Asal</p>
            <p className="text-base">{session?.nama_fakultas}</p>
          </div>
          <div className={'flex flex-col gap-1'}>
            <p className="text-gray-500 text-sm">Jenjang</p>
            <p className="text-base">
              {profileProdi?.kode_jenjang}-{profileProdi?.nama_jenjang_pendidikan}
            </p>
          </div>
        </div>

        <div className={'w-full border border-dashed'} />

        <div className="grid grid-cols-[15rem_1fr] gap-x-6">
          <SideMenuProfile />
          <Outlet />
        </div>
      </div>
    </>
  )
}

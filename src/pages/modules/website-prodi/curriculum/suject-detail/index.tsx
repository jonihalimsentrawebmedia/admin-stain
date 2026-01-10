import { UseGetCurriculumDetail } from '@/pages/modules/website-prodi/curriculum/hook'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { SidenavSubjectCurriculum } from '@/pages/modules/website-prodi/curriculum/suject-detail/component/sidenav.tsx'

export const CurriculumSubjectDetail = () => {
  const { id } = useParams()
  const { detailCurriculum } = UseGetCurriculumDetail(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup label={'Detail Kurikulum Program Studi'} buttonGroup={[]} isBack />

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5 col-span-2">
            <p className="text-sm text-gray-500">Program Studi</p>
            <p className="text-2xl text-green-700 font-semibold">
              {detailCurriculum?.nama_satuan_organisasi}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-sm text-gray-500">Kurikulum</p>
            <p>{detailCurriculum?.nama_kurikulum}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-sm text-gray-500">Jenjang Pendidikan</p>
            <p>
              {detailCurriculum?.kode_jenjang_pendidikan}-
              {detailCurriculum?.nama_jenjang_pendidikan}
            </p>
          </div>
        </div>

        <div className={'w-full border border-dashed'} />

        <SidenavSubjectCurriculum detail={detailCurriculum} />
      </div>
    </>
  )
}

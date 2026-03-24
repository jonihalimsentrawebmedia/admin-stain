import { UseGetCurriculumDetail } from '../hooks/index.tsx'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

export const CurriculumSubjectDetail = () => {
  const { id_subject } = useParams()
  const { curriculumDetail } = UseGetCurriculumDetail(id_subject ?? '')

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup label={'Detail Kurikulum Program Studi'} buttonGroup={[]} isBack />

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5 col-span-2">
            <p className="text-sm text-gray-500">Fakultas</p>
            <p className="text-2xl text-green-700 font-semibold">
              {curriculumDetail?.nama_satuan_organisasi}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-sm text-gray-500">Kurikulum</p>
            <p>{curriculumDetail?.nama_kurikulum}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-sm text-gray-500">Jenjang Pendidikan</p>
            <p>
              {curriculumDetail?.kode_jenjang_pendidikan}-
              {curriculumDetail?.nama_jenjang_pendidikan}
            </p>
          </div>
        </div>

        <div className={'w-full border border-dashed'} />

        {/*<SidenavSubjectCurriculum detail={curriculumDetail} />*/}
      </div>
    </>
  )
}

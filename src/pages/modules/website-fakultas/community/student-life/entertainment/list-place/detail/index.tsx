import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailPlace } from '../hook/index'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailStudentEntertainment = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { placeDetail } = UseGetDetailPlace((id as string) ?? '')

  return (
    <>
      <div className={'space-y-4 py-5'}>
        <ButtonTitleGroup
          label={'Detail Organisasi Mahasiswa'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () =>
                navigate(
                  `/modules/website-fakultas/community/student-life/student-organization/list-organization/edit/${placeDetail?.id_daftar_hiburan_mahasiswa}`
                ),
            },
          ]}
        />

        <img src={placeDetail?.url_gambar} alt="gambar" className={'object-contain h-[200px]'} />

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Nama Organiasi Mahasiswa</p>
          <p className={'text-primary font-semibold text-2xl'}>{placeDetail?.nama}</p>
        </div>

        <TitleLine title={'Deskripsi'} />
        <RenderHTMLContent content={placeDetail?.deskripsi ?? ''} />
      </div>
    </>
  )
}

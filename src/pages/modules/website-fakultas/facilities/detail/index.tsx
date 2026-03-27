import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailFacilities } from '../hooks/index.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailFacilitiesPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetDetailFacilities((id as string) ?? '')

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
                navigate(`/modules/website-fakultas/facilities/edit/${detail?.id_fasilitas}`),
            },
          ]}
        />

        <img src={detail?.url_gambar} alt="gambar" className={'object-contain h-[200px]'} />

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Nama Fasilitas</p>
          <p className={'text-primary font-semibold text-2xl'}>{detail?.nama}</p>
        </div>

        <TitleLine title={'Deskripsi'} />
        <RenderHTMLContent content={detail?.deskripsi ?? ''} />
      </div>
    </>
  )
}

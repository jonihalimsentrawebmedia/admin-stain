import { useNavigate, useParams } from 'react-router-dom'
import { UseGetServiceDetail } from '@/pages/modules/Pulsikom/services/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailServicePulsikom = () => {
  const { id } = useParams()
  const { detail } = UseGetServiceDetail(id as string)
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={`Detail Layanan - ${detail?.nama_layanan}`}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Layanan',
              onClick: () => navigate('/modules/pulsikom/services/edit/' + id),
            },
          ]}
        />

        <img src={detail?.url_gambar} alt="gambar" className="w-[400px] h-[200px] object-cover" />

        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className="text-gray-500">Nama Layanan</p>
          <p className="text-xl font-semibold text-primary">{detail?.nama_layanan}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{detail?.urutan}</p>
          <p className="text-gray-500">Deskripsi Singkat</p>
          <RenderHTMLContent content={detail?.deskripsi_singkat ?? ''} />
          <p className="text-gray-500">Deskripsi Lengkap</p>
          <RenderHTMLContent content={detail?.deskripsi_lengkap ?? ''} />
        </div>
      </div>
    </>
  )
}

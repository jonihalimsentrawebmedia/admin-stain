import { useNavigate, useParams } from 'react-router-dom'
import { UseGetServiceDetail } from '../hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailServiceSPI = () => {
  const { id } = useParams()
  const { detail } = UseGetServiceDetail(id as string)
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={`Detail Layanan - ${detail?.nama}`}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Layanan',
              onClick: () => navigate('/modules/spi/services/edit/' + id),
            },
          ]}
        />

        <img src={detail?.url_gambar} alt="gambar" className="w-[400px] h-[200px] object-cover" />

        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className="text-gray-500">Nama Layanan</p>
          <p className="text-xl font-semibold text-primary">{detail?.nama}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{detail?.urutan}</p>
          <p className="text-gray-500">Deskripsi Lengkap</p>
          <RenderHTMLContent content={detail?.deskripsi ?? ''} />
        </div>
      </div>
    </>
  )
}

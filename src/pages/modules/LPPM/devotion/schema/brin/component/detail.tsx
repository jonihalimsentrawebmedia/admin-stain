import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailBRIN } from '../hooks/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailDataBRIN = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetDetailBRIN(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Detail Pendanan BRIN'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/lppm/devotion/schema/brin/edit/${detail?.id_brin}`),
            },
          ]}
        />

        <p className={'text-green-500'}>Urutan {detail?.urutan}</p>
        <p className="text-2xl font-semibold">{detail?.judul}</p>
        <RenderHTMLContent content={detail?.deskripsi ?? ''} />
      </div>
    </>
  )
}

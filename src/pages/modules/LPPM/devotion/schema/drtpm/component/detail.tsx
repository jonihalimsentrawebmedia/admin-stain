import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailDRTPM } from '../hooks/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailDataDRTPM = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetDetailDRTPM(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Detail Pendanan DRTPM'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () =>
                navigate(`/modules/lppm/devotion/schema/drtpm/edit/${detail?.id_drtpm}`),
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

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailOtherFunding } from '../hooks/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailOtherFunding = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetDetailOtherFunding(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Detail Pendanan Lainnya'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () =>
                navigate(
                  `/modules/lppm/devotion/schema/other/edit/${detail?.id_pendanaan_lainnya}`
                ),
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

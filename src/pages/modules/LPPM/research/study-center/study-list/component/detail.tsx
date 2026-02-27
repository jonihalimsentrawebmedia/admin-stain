import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetStudyCenterDetail } from '../hook/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailStudyCenter = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetStudyCenterDetail(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Detail Pusat Studi'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () =>
                navigate(
                  `/modules/lppm/research/study-center/study-list/edit${detail?.id_pusat_studi}`
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

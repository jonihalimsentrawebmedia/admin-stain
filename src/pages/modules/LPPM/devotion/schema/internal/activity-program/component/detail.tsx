import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetActivityProgramDetail } from '../hooks/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailActivityProgram = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetActivityProgramDetail(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Detail Program Kegiatan'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () =>
                navigate(
                  `/modules/lppm/devotion/schema/internal/activity-program/edit/${detail?.id_daftar_skema}`
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

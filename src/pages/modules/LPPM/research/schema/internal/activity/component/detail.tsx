import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useParams } from 'react-router-dom'
import { HiPencil } from 'react-icons/hi'
import { UseGetActivityProgramDetail } from '@/pages/modules/LPPM/research/schema/internal/activity/hooks'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailActivityProgramInternal = () => {
  const { id } = useParams()
  const { detail } = UseGetActivityProgramDetail(id ?? '')

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          isBack
          label={'Detail Program Kegiatan'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Link
                  className={
                    'text-primary border-primary border p-1.5 rounded flex items-center gap-1.5 px-4 text-sm'
                  }
                  to={`/modules/lppm/research/schema/internal/activity/edit/${detail?.id_daftar_program_kegiatan}`}
                >
                  <HiPencil className={'size-4'} />
                  Edit Data
                </Link>
              ),
            },
          ]}
        />

        <p className="text-primary font-semibold">Urutan {detail?.urutan}</p>

        <p className={'text-2xl font-semibold'}>{detail?.judul}</p>
        
        <RenderHTMLContent content={detail?.deskripsi ?? ''} />
      </div>
    </>
  )
}

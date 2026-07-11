import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { FaListUl } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ButtonAddFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/components/buttonAdd.tsx'
import { UseGetListFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const QuestionFAQProdiPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listFaq, loading, meta } = UseGetListFAQProdi({
    limit: limit,
    page: page,
    search: search,
  })
  const columns = ColumnsFAQProdi()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'F.A.Q'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide="F.A.Q" valueGuide="PRODI_FAQ" />,
            },
            {
              type: 'custom',
              element: (
                <div className={'flex items-center flex-wrap gap-2'}>
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className={'border border-primary text-primary hover:text-primary'}
                  >
                    <IoMdImage />
                    Gambar Background
                  </Button>
                  <Button
                    onClick={() => navigate('category')}
                    variant={'outline'}
                    className={'border border-primary text-primary hover:text-primary'}
                  >
                    <FaListUl />
                    Kategori F.A.Q
                  </Button>
                  <ButtonAddFAQProdi />
                </div>
              ),
            },
          ]}
        />

        <TableCustom data={listFaq} loading={loading} meta={meta} columns={columns} />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaListUl } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ButtonAddFAQUnit } from './components/buttonAdd'
import { UseGetListFAQUnit } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsFAQUnit } from './data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const QuestionFAQPMBPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const navigate = useNavigate()
  const { listFaq, loading, metta } = UseGetListFAQUnit({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsFAQUnit()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'F.A.Q'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide="F.A.Q PMB" valueGuide="PMB_FAQ" />,
            },
            {
              type: 'custom',
              element: (
                <div className={'flex items-center gap-2'}>
                  <Button
                    onClick={() => navigate('category')}
                    variant={'outline'}
                    className={'border border-primary text-primary hover:text-primary'}
                  >
                    <FaListUl />
                    Kategori F.A.Q
                  </Button>
                  <ButtonAddFAQUnit />
                </div>
              ),
            },
          ]}
        />

        <TableCustom data={listFaq} loading={loading} meta={metta} columns={columns} />
      </div>
    </>
  )
}

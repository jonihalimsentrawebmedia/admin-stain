import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaListUl } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ButtonAddFAQUnit } from './components/buttonAdd'
import { UseGetListFAQUnit } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsFAQUnit } from './data/columns.tsx'

export const QuestionFAQUnitPage = () => {
  const navigate = useNavigate()
  const { listFaq, loading, metta } = UseGetListFAQUnit()
  const columns = ColumnsFAQUnit()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'F.A.Q'}
          buttonGroup={[
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

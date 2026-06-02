import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddExpenditure } from './buttonAdd.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetExpenditure } from './hooks.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsExpenditure } from './columns.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'

const ExpenditureSection = () => {
  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { loading, meta, expenditure } = UseGetExpenditure({
    id_acara: id as string,
    page,
    search,
    limit,
  })
  const columns = ColumnsExpenditure()

  return (
    <>
      <Card className={'rounded-lg shadow-none p-3'}>
        <CardContent className="space-y-5">
          <ButtonTitleGroup
            label={'Pengeluaran Keuangan'}
            buttonGroup={[{ type: 'custom', element: <ButtonAddExpenditure /> }]}
          />
          <TableCustom data={expenditure} columns={columns} loading={loading} meta={meta} />
        </CardContent>
      </Card>
    </>
  )
}
export default ExpenditureSection

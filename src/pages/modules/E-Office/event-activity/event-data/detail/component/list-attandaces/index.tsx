import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import ButtonAddAttendance from './component/buttonAdd.tsx'
import { UseGetAttendance } from './component/hooks.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { ColumnsAttendance } from './component/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListAttendance = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { attendance, loading, meta } = UseGetAttendance({
    id_acara: id as string,
    page,
    limit,
    search,
  })
  const columns = ColumnsAttendance()

  return (
    <>
      <Card className={'p-2 rounded shadow-none'}>
        <CardContent className="space-y-5 p-2">
          <ButtonTitleGroup
            label={'Daftar Hadir'}
            buttonGroup={[{ type: 'custom', element: <ButtonAddAttendance /> }]}
          />
          <TableCustom data={attendance} columns={columns} loading={loading} meta={meta} />
        </CardContent>
      </Card>
    </>
  )
}
export default ListAttendance

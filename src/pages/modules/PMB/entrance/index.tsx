import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddEntrancePMB from '@/pages/modules/PMB/entrance/component/ButtonAdd.tsx'
import { UseGetEntrance } from '@/pages/modules/PMB/entrance/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsEntrance } from '@/pages/modules/PMB/entrance/data/Columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const EntrancePMGPage = () => {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''
  const { entrance, loading, meta } = UseGetEntrance({
    limit: limit,
    page: page,
    search: search,
  })
  const columns = ColumnsEntrance()
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Jalur Masuk'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddEntrancePMB /> }]}
        />

        <TableCustom data={entrance} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default EntrancePMGPage

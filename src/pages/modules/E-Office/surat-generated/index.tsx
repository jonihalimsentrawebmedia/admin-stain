import { useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetSuratGenerated } from './hooks'
import { ColumnsSuratGenerated } from './data/columns.tsx'

const ListSuratGenerated = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { suratList, meta, loading } = UseGetSuratGenerated({ page, limit, search })
  const columns = ColumnsSuratGenerated()

  return (
    <div className="space-y-5">
      <ButtonTitleGroup label={'Surat Generated'} buttonGroup={[]} />
      <TableCustom data={suratList} columns={columns} meta={meta} loading={loading} />
    </div>
  )
}

export default ListSuratGenerated

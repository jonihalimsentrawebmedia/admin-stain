import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { columnsSetStatusActive } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/data/columns.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const SetStatusActivePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const filter = searchParams.get('filter') ?? ''

  const { loading, employee, meta } = UseGetEmployee({
    page: page,
    limit: limit,
    search: search,
    filter: filter,
  })
  const columns = columnsSetStatusActive()
  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup label="Set Status Aktif" buttonGroup={[]} />

        <TableCustom columns={columns} data={employee} loading={loading} meta={meta} />
      </div>
    </>
  )
}

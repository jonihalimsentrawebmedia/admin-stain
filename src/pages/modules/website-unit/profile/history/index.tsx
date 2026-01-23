import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddHistory } from '@/pages/modules/website-unit/profile/history/component/buttonAdd.tsx'
import { UseGetHistoryUnit } from '@/pages/modules/website-unit/profile/history/hooks'
import { ColumnsHistory } from '@/pages/modules/website-unit/profile/history/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'

export const HistoryUnit = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { historyUnit, meta, loading } = UseGetHistoryUnit({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsHistory()
  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Sejarah Unit'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddHistory />, onClick: () => {} }]}
        />

        <TableCustom isShowFilter={false} columns={columns} data={historyUnit} loading={loading} meta={meta} />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddHistory } from '@/pages/modules/website-unit/profile/history/component/buttonAdd.tsx'
import { UseGetHistoryUnit } from '@/pages/modules/website-unit/profile/history/hooks'
import { ColumnsHistory } from '@/pages/modules/website-unit/profile/history/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const HistoryUnit = () => {
  const { historyUnit, meta, loading } = UseGetHistoryUnit()
  const columns = ColumnsHistory()
  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Sejarah Unit'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddHistory />, onClick: () => {} }]}
        />

        <TableCustom columns={columns} data={historyUnit} loading={loading} meta={meta} />
      </div>
    </>
  )
}

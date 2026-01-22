import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/hooks'
import { OperHourColumns } from '@/pages/modules/website-unit/services/operational-hour/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/component/buttonAdd.tsx'

export const OperationalHourPage = () => {
  const { operationalHour, meta, loading } = UseGetOperationalHour()
  const columns = OperHourColumns()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Jadwal Operasional'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddOperationalHour /> }]}
        />

        <TableCustom columns={columns} data={operationalHour} loading={loading} meta={meta} />
      </div>
    </>
  )
}

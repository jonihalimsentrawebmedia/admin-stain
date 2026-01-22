import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddFloorPlan } from '@/pages/modules/website-unit/floor-plan/component/buttonAdd.tsx'
import { type ISessionUnit, UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { ColumnsFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/columns.tsx'
import { UseGetFloorPlan } from '@/pages/modules/website-unit/floor-plan/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const FloorPlanUnitPage = () => {
  const { session } = UseGetSessionUnit()
  const { floorPlan, meta, loading } = UseGetFloorPlan()
  const columns = ColumnsFloorPlan({ ...session as ISessionUnit })
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Denah Lantai'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddFloorPlan session={session} /> }]}
        />

        <TableCustom columns={columns} data={floorPlan} loading={loading} meta={meta} />
      </div>
    </>
  )
}

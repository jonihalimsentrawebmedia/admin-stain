import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddFloorPlan } from '@/pages/modules/website-unit/floor-plan/component/buttonAdd.tsx'
import { type ISessionUnit, UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { ColumnsFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/columns.tsx'
import { UseGetFloorPlan } from '@/pages/modules/website-unit/floor-plan/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const FloorPlanUnitPage = () => {
  const { session } = UseGetSessionUnit()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { floorPlan, meta, loading } = UseGetFloorPlan({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsFloorPlan({ ...(session as ISessionUnit) })
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Denah Lantai'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="Denah Lantai" valueGuide="PERPUSTAKAAN_DENAH_LANTAI" />
              ),
            },
            { type: 'custom', element: <ButtonAddFloorPlan session={session} /> },
          ]}
        />

        <TableCustom columns={columns} data={floorPlan} loading={loading} meta={meta} />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/hooks'
import { OperHourColumns } from '@/pages/modules/website-unit/services/operational-hour/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const OperationalHourPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { operationalHour, meta, loading } = UseGetOperationalHour({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = OperHourColumns()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Jadwal Operasional'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Jadwal Operasional"
                  valueGuide="PERPUSTAKAAN_LAYANAN_JAM_OPERASIONAL_UNIT"
                />
              ),
            },
            { type: 'custom', element: <ButtonAddOperationalHour /> },
          ]}
        />

        <TableCustom columns={columns} data={operationalHour} loading={loading} meta={meta} />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddZoneIntegrityCategory } from '@/pages/modules/website-fakultas/zone-integrity/component/buttonAdd.tsx'
import { UseGetZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/hooks'
import ColumnsZoneIntegrity from '@/pages/modules/website-fakultas/zone-integrity/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const ZoneIntegrityPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { zoneIntegrity, meta, loading } = UseGetZoneIntegrity({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsZoneIntegrity()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Zona Integritas'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Zona Integritas'}
                  valueGuide="FAKULTAS_ZONA_INTEGRITAS"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddZoneIntegrityCategory />,
            },
          ]}
        />

        <TableCustom data={zoneIntegrity} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

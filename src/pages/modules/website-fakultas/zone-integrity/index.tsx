import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddZoneIntegrityCategory } from '@/pages/modules/website-fakultas/zone-integrity/component/buttonAdd.tsx'
import { UseGetZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/hooks'
import ColumnsZoneIntegrity from '@/pages/modules/website-fakultas/zone-integrity/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const ZoneIntegrityPage = () => {
  const { zoneIntegrity, meta, loading } = UseGetZoneIntegrity()
  const columns = ColumnsZoneIntegrity()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Zona Integritas'}
          buttonGroup={[
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

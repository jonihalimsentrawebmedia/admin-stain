import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetPortal } from '@/pages/modules/SPI/external-portal/hooks'
import { ColumnsExternalPortal } from '@/pages/modules/SPI/external-portal/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddPortal } from '@/pages/modules/SPI/external-portal/component/buttonAdd.tsx'

export const ExternalPortalPage = () => {
  const { portal, loading, meta } = UseGetPortal()
  const columns = ColumnsExternalPortal()
  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          label={'Portal Eksternal'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddPortal /> }]}
        />
        <TableCustom data={portal} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

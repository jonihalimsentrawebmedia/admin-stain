import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetService } from '@/pages/modules/website-fakultas/service/hooks'
import { ColumnsService } from '@/pages/modules/website-fakultas/service/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddService } from '@/pages/modules/website-fakultas/service/component/buttonAdd.tsx'

export const ServiceListPage = () => {
  const { service, meta, loading } = UseGetService()
  const columns = ColumnsService()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          label="Layanan"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddService />,
            },
          ]}
        />
        <TableCustom data={service} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

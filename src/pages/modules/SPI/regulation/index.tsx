import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetRegulation } from '@/pages/modules/SPI/regulation/hooks'
import { ButtonAddRegulation } from '@/pages/modules/SPI/regulation/component/buttonAdd.tsx'
import { ColumnsRegulation } from '@/pages/modules/SPI/regulation/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const RegulationPage = () => {
  const { regulation, meta, loading } = UseGetRegulation()
  const columns = ColumnsRegulation()
  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          label={'Peraturan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddRegulation />,
            },
          ]}
        />
        <TableCustom data={regulation} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

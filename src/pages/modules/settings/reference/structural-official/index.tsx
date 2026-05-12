import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonCreateStructural from '@/pages/modules/settings/reference/structural-official/component/buttonCreate.tsx'
import { UseStructuralOfficial } from '@/pages/modules/settings/reference/structural-official/hooks'
import { ColumnsStructuralOfficial } from '@/pages/modules/settings/reference/structural-official/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const StructuralOfficialPage = () => {
  const { structural } = UseStructuralOfficial()
  const columns = ColumnsStructuralOfficial()
  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Jabatan Struktural'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonCreateStructural />,
            },
          ]}
        />

        <TableCustom columns={columns} data={structural} />
      </div>
    </>
  )
}
export default StructuralOfficialPage

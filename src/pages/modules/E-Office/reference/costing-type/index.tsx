import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddBiayaType from '@/pages/modules/E-Office/reference/costing-type/component/buttonAdd.tsx'
import { USeGetBiayaType } from '@/pages/modules/E-Office/reference/costing-type/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsBiayaType } from '@/pages/modules/E-Office/reference/costing-type/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListBiayaType = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { biayaType, meta, loading } = USeGetBiayaType({
    page,
    limit,
    search,
  })
  const columns = ColumnsBiayaType()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Jenis Biaya'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddBiayaType />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={biayaType}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListBiayaType

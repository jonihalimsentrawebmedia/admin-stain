import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddTransportType from '@/pages/modules/E-Office/reference/transport-type/component/buttonAdd.tsx'
import { UseGetTransportType } from '@/pages/modules/E-Office/reference/transport-type/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsTransportType } from '@/pages/modules/E-Office/reference/transport-type/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const ListTransportType = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { transportType, meta, loading } = UseGetTransportType({ page, limit, search })
  const columns = ColumnsTransportType()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Jenis Transportasi'}
          buttonGroup={[
            { type: 'custom', element: <ButtonAddTransportType /> },
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Referensi'} valueGuide="E_OFFICE_REFERENCE" />,
            },
          ]}
        />
        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={transportType}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListTransportType

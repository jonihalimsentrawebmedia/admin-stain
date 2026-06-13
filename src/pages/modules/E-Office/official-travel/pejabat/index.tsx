import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddPejabat from '@/pages/modules/E-Office/official-travel/pejabat/component/buttonAdd.tsx'
import { USeGetPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListPejabat = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { pejabat, meta, loading } = USeGetPejabat({
    page,
    limit,
    search,
  })
  const columns = ColumnsPejabat()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Pejabat'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPejabat />,
            },
          ]}
        />

        <TableCustom data={pejabat} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
export default ListPejabat

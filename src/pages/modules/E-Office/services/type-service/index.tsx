import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetTypeService } from '@/pages/modules/E-Office/services/type-service/hooks'
import { useSearchParams } from 'react-router-dom'
import { columnsTypeService } from '@/pages/modules/E-Office/services/type-service/data/columns.tsx'
import ButtonAddTypeService from '@/pages/modules/E-Office/services/type-service/component/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const TypeServiceListPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { typeService, meta, loading } = UseGetTypeService({
    page,
    limit,
    search,
  })
  const columns = columnsTypeService()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Jenis Layanan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddTypeService />,
            },
          ]}
        />
        <TableCustom data={typeService} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}

export default TypeServiceListPage

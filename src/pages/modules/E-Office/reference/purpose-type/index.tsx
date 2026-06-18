import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddPurposeType from '@/pages/modules/E-Office/reference/purpose-type/component/buttonAdd.tsx'
import { UseGetPurposeType } from '@/pages/modules/E-Office/reference/purpose-type/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsPurposeType } from '@/pages/modules/E-Office/reference/purpose-type/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const PurposeTypePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { purposeType, meta, loading } = UseGetPurposeType({
    page,
    limit,
    search,
  })
  const columns = ColumnsPurposeType()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Jenis Keperluan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPurposeType />,
            },
          ]}
        />
        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={purposeType}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default PurposeTypePage

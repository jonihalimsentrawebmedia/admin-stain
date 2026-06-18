import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddLetterType from './component/buttonAdd.tsx'
import { USeGetLetterType } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsLetterType } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListLetterType = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterType, meta, loading } = USeGetLetterType({
    page,
    limit,
    search,
  })
  const columns = ColumnsLetterType()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Jenis Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLetterType />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={letterType}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListLetterType

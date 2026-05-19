import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetEntranceNonUkt } from './hooks/index.tsx'
import { ColumnsEntranceNonUkt } from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddEntranceNonUkt } from './component/buttonAdd.tsx'

export const EntranceListNonUktPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { entrance, meta, loading } = UseGetEntranceNonUkt({
    page,
    limit,
    search,
  })
  const columns = ColumnsEntranceNonUkt()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label="Jalur Masuk UKT"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddEntranceNonUkt />,
            },
          ]}
        />
        <TableCustom columns={columns} data={entrance} loading={loading} meta={meta} />
      </div>
    </>
  )
}

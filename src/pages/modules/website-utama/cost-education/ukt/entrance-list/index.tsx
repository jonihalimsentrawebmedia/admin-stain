import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetEntrance } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/hooks'
import { ColumnsEntranceUkt } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/data/columns.tsx'
import { ButtonAddEntranceUkt } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/component/buttonAdd.tsx'

export const EntranceListUktPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { entrance, meta, loading } = UseGetEntrance({
    page,
    limit,
    search,
  })
  const columns = ColumnsEntranceUkt()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label="Jalur Masuk UKT"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddEntranceUkt />,
            },
          ]}
        />
        <TableCustom columns={columns} data={entrance} loading={loading} meta={meta} />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { USeGetLetterOrigin } from './hooks'
import { ColumnsLetterOrigin } from './data/columns.tsx'
import ButtonAddLetterOrigin from './component/buttonAdd.tsx'

const ListLetterOrigin = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterOrigin, meta, loading } = USeGetLetterOrigin({
    page,
    limit,
    search,
  })
  const columns = ColumnsLetterOrigin()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Sifat Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLetterOrigin />,
            },
          ]}
        />

        <TableCustom data={letterOrigin} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
export default ListLetterOrigin

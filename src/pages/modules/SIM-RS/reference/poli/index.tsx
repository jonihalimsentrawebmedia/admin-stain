import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetPoli } from './hooks/index.tsx'
import { ColumnsPoli } from './data/columns.tsx'
import { ButtonAddPoli } from './component/buttonAdd.tsx'

export const PoliPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { poli, loading, meta } = UseGetPoli({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsPoli()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Data Poli'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPoli />,
            },
          ]}
        />

        <TableCustom data={poli} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

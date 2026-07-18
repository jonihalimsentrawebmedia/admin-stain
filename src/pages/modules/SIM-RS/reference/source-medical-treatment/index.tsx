import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetSumberBiaya } from './hooks/index.tsx'
import { ColumnsSumberBiaya } from './data/columns.tsx'
import { ButtonAddSumberBiaya } from './component/buttonAdd.tsx'

export const SumberBiayaPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { sumberBiaya, loading, meta } = UseGetSumberBiaya({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsSumberBiaya()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Sumber Biaya Pengobatan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddSumberBiaya />,
            },
          ]}
        />

        <TableCustom data={sumberBiaya} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

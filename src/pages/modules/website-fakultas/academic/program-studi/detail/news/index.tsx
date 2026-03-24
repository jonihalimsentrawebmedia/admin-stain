import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetNewsProdiFaculty } from '@/pages/modules/website-fakultas/academic/program-studi/detail/news/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsNewsFaculty } from '@/pages/modules/website-fakultas/academic/program-studi/detail/news/data/columns.tsx'

export const NewsProdiFaculty = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { news, loading, meta } = UseGetNewsProdiFaculty({
    id_unit: (id as string) ?? '',
    search: search,
    page: page,
    limit: limit,
  })
  const columns = ColumnsNewsFaculty()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup buttonGroup={[]} label="Berita" />
        <TableCustom data={news} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

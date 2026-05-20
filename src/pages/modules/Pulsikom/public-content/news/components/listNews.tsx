import { UseGetCarrierNews, UseGetNewsYear } from '../hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '../data/types'
import { ColumnsReturnByStatus } from './columns/index'
import { useSearchParams } from 'react-router-dom'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

interface props {
  status: StatusPublish
}

export const TableDataListNews = (props: props) => {
  const { status } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const year = searchParams.get('year') || ''

  const { year: years } = UseGetNewsYear()
  const { loading, meta, unitNews } = UseGetCarrierNews({
    status_publish: status,
    page: page,
    limit: limit,
    search: search,
    year: year,
  })
  const columns = ColumnsReturnByStatus(status)

  return (
    <>
      <TableCustom
        addFilter={
          <div className={'flex items-center gap-1.5'}>
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tahun"
              name={'year'}
              options={years?.map((row) => ({
                label: row?.toString(),
                value: row?.toString(),
              }))}
            />
          </div>
        }
        data={unitNews}
        loading={loading}
        meta={meta}
        columns={columns}
      />
    </>
  )
}

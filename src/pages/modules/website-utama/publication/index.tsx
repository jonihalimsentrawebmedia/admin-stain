import { UseGetPublicationLecturer, UseGetYearPublication } from './hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import { ColumnsPublication } from '@/pages/modules/website-utama/publication/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { useSearchParams } from 'react-router-dom'

export const PublicationLecturerPage = () => {
  const { year } = UseGetYearPublication()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const tahun = searchParams.get('year') ?? ''

  const { publication, meta, loading } = UseGetPublicationLecturer({
    search,
    page,
    limit,
    year: tahun,
  })
  const columns = ColumnsPublication()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup label={'Publikasi Dosen'} buttonGroup={[]} />
        <FilterSelect
          placeholder={'Tahun Publikasi'}
          name={'year'}
          label={'Tahun Publikasi'}
          className={'max-w-sm z-[50]'}
          selectClassName={'z-[50]'}
          data={
            year?.map((row: string | number) => ({
              label: row.toString(),
              value: row?.toString(),
            })) ?? []
          }
        />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'min-w-[100px]!'}
              label={'limit'}
              name={'limit'}
              options={
                [10, 25, 50, 100].map((row) => ({
                  label: row?.toString(),
                  value: row?.toString(),
                })) ?? []
              }
            />
          }
          columns={columns}
          data={publication}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

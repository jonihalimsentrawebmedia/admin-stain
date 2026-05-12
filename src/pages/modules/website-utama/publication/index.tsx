import { UseGetPublicationLecturer, UseGetYearPublication } from './hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import { ColumnsPublication } from '@/pages/modules/website-utama/publication/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const PublicationLecturerPage = () => {
  const { year } = UseGetYearPublication()
  const { publication, meta, loading } = UseGetPublicationLecturer()
  const columns = ColumnsPublication()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup label={'Publikasi Dosen'} buttonGroup={[]} />
        <FilterSelect
          placeholder={'Tahun Publikasi'}
          name={'year'}
          label={'Tahun Publikasi'}
          className={'max-w-sm'}
          data={
            year?.map((row) => ({
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

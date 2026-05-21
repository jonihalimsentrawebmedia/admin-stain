import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStaff } from '@/pages/modules/website-fakultas/academic/program-studi/detail/staff/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import StaffColumnsFaculty from '@/pages/modules/website-fakultas/academic/program-studi/detail/staff/data/cloumns.tsx'

export const StaffDetailProdi = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { staff, loading, meta } = UseGetStaff({
    id_unit: (id as string) ?? '',
    search: search,
    page: page,
    limit: limit,
  })
  const columns = StaffColumnsFaculty()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Staff'}
                  valueGuide="FAKUTLAS_AKADEMIK_PROGRAM_STUDI_STAFF"
                />
              ),
            },
          ]}
          label="Staff"
          isBack
        />

        <TableCustom data={staff} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

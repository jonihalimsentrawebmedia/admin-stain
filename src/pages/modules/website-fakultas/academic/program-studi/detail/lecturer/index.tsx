import { UseGetLecturer } from '@/pages/modules/website-fakultas/academic/program-studi/detail/lecturer/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import LecturerColumnsFaculty from '@/pages/modules/website-fakultas/academic/program-studi/detail/lecturer/data/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonSyncLecturerFCM from '@/pages/modules/website-fakultas/academic/program-studi/detail/lecturer/component/buttonSync.tsx'

export const LecturerDetailProfile = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? '10'

  const { lecturer, meta, loading } = UseGetLecturer({
    id_unit: (id as string) ?? '',
    search: search,
    page: page,
    limit: limit,
  })

  const { columns } = LecturerColumnsFaculty()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonSyncLecturerFCM />,
            },
          ]}
          label="Dosen"
          isBack
        />
        <TableCustom data={lecturer} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

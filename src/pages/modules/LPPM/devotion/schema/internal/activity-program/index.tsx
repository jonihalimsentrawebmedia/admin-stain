import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetActivityProgram } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/hooks'
import { ColumnsStudyCenter } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const ActivityProgramSchema = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { activityProgram, meta, loading } = UseGetActivityProgram({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsStudyCenter()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          isBack
          label={'Daftar Program Kegiatan'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Program Kegiatan',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={activityProgram} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

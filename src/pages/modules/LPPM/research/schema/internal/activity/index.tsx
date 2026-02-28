import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetActivityProgram } from '@/pages/modules/LPPM/research/schema/internal/activity/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsActivityProgram } from '@/pages/modules/LPPM/research/schema/internal/activity/data/columns.tsx'

export const ActivityProgramPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { activity, meta, loading } = UseGetActivityProgram({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsActivityProgram()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Daftar Program Kegiatan'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Program Kegiatan',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={activity} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

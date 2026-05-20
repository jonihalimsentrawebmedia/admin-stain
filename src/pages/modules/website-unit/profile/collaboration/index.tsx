import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CollaborationColumns } from '@/pages/modules/website-unit/profile/collaboration/data/columns.tsx'
import { UseGetUnitCollaboration } from '@/pages/modules/website-unit/profile/collaboration/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const Collaboration = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const columns = CollaborationColumns()
  const { unitCollaboration, loading, meta } = UseGetUnitCollaboration({
    page: page,
    limit: limit,
    search: search,
  })

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Kerjasama Unit'}
          buttonGroup={[
             {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide='Kerjasama Unit' valueGuide="PERPUSTAKAAN_PROFIL_KERJASAMA" />,
            },
            {
              type: 'add',
              label: 'Tambah kerjasama',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom columns={columns} data={unitCollaboration} loading={loading} meta={meta} />
      </div>
    </>
  )
}

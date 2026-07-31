import { useNavigate, useSearchParams } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'
import { Button } from '@/components/ui/button.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetUser } from './hooks/index.tsx'
import { ColumnsUserList } from './data/columns.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const UserListPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const navigate = useNavigate()
  const permission = GuardCrud({ keys: 'DAFTAR_USER' })

  const { user, meta, loading } = UseGetUser({ page, limit, search })
  const columns = ColumnsUserList()

  return (
    <div className={'space-y-5'}>
      <ButtonTitleGroup
        label={'Daftar User'}
        buttonGroup={[
          { type: 'custom' as const, element: <ButtonGoToGuide titleGuide={'Daftar User'} valueGuide="SIM_RS_USER_MANAGEMENT" /> },
          ...(permission?.kelola
            ? [
                {
                  type: 'custom' as const,
                  element: (
                    <Button
                      onClick={() => navigate('/modules/sim-rs/user-management/user-list/add')}
                      className={'border-primary text-primary hover:text-primary'}
                      variant={'outline'}
                    >
                      <HiPlus />
                      Tambah
                    </Button>
                  ),
                },
              ]
            : []),
        ]}
      />
      <TableCustom data={user} columns={columns} loading={loading} meta={meta} />
    </div>
  )
}

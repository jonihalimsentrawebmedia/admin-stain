import { useNavigate, useSearchParams } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'
import { Button } from '@/components/ui/button.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetRole } from './hooks/index.tsx'
import { ColumnsRole } from './data/columns.tsx'

export const RolePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const navigate = useNavigate()

  const { role, meta, loading } = UseGetRole({ page, limit, search })
  const columns = ColumnsRole()

  return (
    <div className={'space-y-5'}>
      <ButtonTitleGroup
        label={'Role User'}
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <Button
                onClick={() => navigate('add')}
                className={'border-primary text-primary hover:text-primary'}
                variant={'outline'}
              >
                <HiPlus />
                Tambah
              </Button>
            ),
          },
        ]}
      />
      <TableCustom data={role} columns={columns} loading={loading} meta={meta} />
    </div>
  )
}

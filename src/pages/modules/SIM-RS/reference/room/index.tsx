import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { UseGetRoom } from './hooks/index.tsx'
import { ColumnsRoom } from './data/columns.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPlus } from 'react-icons/hi'

export const RoomPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const navigate = useNavigate()

  const { room, loading, meta } = UseGetRoom({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsRoom()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Data Ruangan'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('/modules/sim-rs/reference/room/add')}
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

        <TableCustom data={room} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

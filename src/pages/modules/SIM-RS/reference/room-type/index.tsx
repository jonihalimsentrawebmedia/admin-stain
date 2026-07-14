import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetRoomType } from './hooks/index.tsx'
import { ColumnsRoomType } from './data/columns.tsx'
import { ButtonAddRoomType } from './component/buttonAdd.tsx'

export const RoomTypePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { roomType, loading, meta } = UseGetRoomType({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsRoomType()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Jenis Ruangan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddRoomType />,
            },
          ]}
        />

        <TableCustom data={roomType} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

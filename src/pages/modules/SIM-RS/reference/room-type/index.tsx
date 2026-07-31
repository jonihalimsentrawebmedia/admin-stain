import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetRoomType } from './hooks/index.tsx'
import { ColumnsRoomType } from './data/columns.tsx'
import { ButtonAddRoomType } from './component/buttonAdd.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const RoomTypePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const permission = GuardCrud({ keys: 'JENIS_RUANGAN' })

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
          buttonGroup={
            permission?.kelola
              ? [
                  { type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_REFERENCE" /> },
                  {
                    type: 'custom',
                    element: <ButtonAddRoomType />,
                  },
                ]
              : []
          }
        />

        <TableCustom
          columnsName={permission?.kelola ? [''] : ['action']}
          data={roomType}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

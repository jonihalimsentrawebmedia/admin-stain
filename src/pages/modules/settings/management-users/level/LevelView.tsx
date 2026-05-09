import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import LevelViewModel from './LevelViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import useGetLevelUser from './controller/useGetLevelUser'
import { useSearchParams } from 'react-router-dom'

const LevelView = () => {
  const { columns, goToAdd } = LevelViewModel()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const { levelUser, loading, meta } = useGetLevelUser({
    page: page,
    limit: limit,
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Level User"
        buttonGroup={[
          {
            label: 'Tambah Data',
            onClick: () => goToAdd(),
            type: 'add',
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={levelUser}
        loading={loading}
        meta={meta}
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
        placeHolderSearch="Cari Level User"
      />
    </div>
  )
}

export default LevelView

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import UsersViewModel from './UsersViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetUsers from './controller/useGetUsers'
import useGetLevelUser from '../level/controller/useGetLevelUser'
import { useSearchParams } from 'react-router-dom'

const UsersView = () => {
  const { columns, goToAdd } = UsersViewModel()
  const { loading, users, meta } = useGetUsers()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const { levelUser } = useGetLevelUser({
    page: page,
    limit: limit,
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data User"
        buttonGroup={[
          {
            label: 'Tambah Data',
            onClick: () => goToAdd(),
            type: 'add',
          },
        ]}
      />

      <TableCustom
        addFilter={
          <SelectFilter
            name="level"
            label="Level User"
            options={levelUser.map((item) => {
              return {
                label: item.nama,
                value: item.id_level,
              }
            })}
          />
        }
        columns={columns}
        data={users}
        loading={loading}
        meta={meta}
        placeHolderSearch="Cari  User"
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
      />
    </div>
  )
}

export default UsersView

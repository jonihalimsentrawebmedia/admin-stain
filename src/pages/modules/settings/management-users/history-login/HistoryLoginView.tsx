import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import HistoryLoginViewModel from './HistoryLoginViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetHistoryLogin from './controller/useGetHistoryLogin'

import useGetLevelUser from '../level/controller/useGetLevelUser'

const HistoryLoginView = () => {
  const { columns } = HistoryLoginViewModel()
  const { histories, loading, meta } = useGetHistoryLogin()
  const { levelUser } = useGetLevelUser(true)
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup label="Histori Login" buttonGroup={[]} />

      <TableCustom
        addFilter={
          <SelectFilter
            label="Level User"
            options={levelUser?.map((item) => {
              return {
                label: item.nama,
                value: item.id_level,
              }
            })}
            name="level"
          />
        }
        columns={columns}
        data={histories}
        loading={loading}
        meta={meta}
        tdClassName='whitespace-pre-line'
        thClassName='whitespace-pre-line'
        placeHolderSearch="Cari  User"
      />
    </div>
  )
}

export default HistoryLoginView

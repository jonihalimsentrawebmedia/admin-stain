import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import HistoryLoginDetailViewModel from './HistoryLoginDetailViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import DetailField from '@/components/common/field/DetailField'
import useGetLogHistory from '../controller/useGetLogHistory'

const HistoryLoginDetailView = () => {
  const { histories, meta, loading } = useGetLogHistory()
  const { columns, fieldsConfig, form } = HistoryLoginDetailViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup label="Lihat Log Aktivitas" buttonGroup={[]} />
      <div className="rounded-xl bg-[#F5FFFA] border border-primary p-4">
        <DetailField data={fieldsConfig} form={form} isRow />
      </div>

      <TableCustom
        loading={loading}
        meta={meta}
        columns={columns}
        data={histories ?? []}
        isShowFilter={false}
      />
    </div>
  )
}

export default HistoryLoginDetailView

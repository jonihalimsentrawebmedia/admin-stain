import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetLogServiceProdi } from '@/pages/modules/website-prodi/service/hooks'
import { useParams } from 'react-router-dom'

export const LogDataServicePage = () => {
  const { id } = useParams()
  const { serviceProdiLog, meta, loading } = UseGetLogServiceProdi(id ?? '')
  const columns = ColumnsLog()
  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <p className="text-primary">History Perubahan Data</p>
      <TableCustom data={serviceProdiLog} meta={meta} loading={loading} columns={columns} />
    </>
  )
}

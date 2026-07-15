import { useSearchParams } from 'react-router-dom'
import { UseGetRegistration } from '../register/hooks/index.tsx'
import { ColumnsOutpatient } from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

export const OutpatientPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { registration, meta, loading } = UseGetRegistration({
    page,
    limit,
    search,
    is_inap: 'false',
    status: 'SELESAI',
    status_rawat_inap: '',
  })

  const columns = ColumnsOutpatient()

  return (
    <div className="space-y-5">
      <ButtonTitleGroup label="Rawat Jalan" buttonGroup={[]} />
      <TableCustom
        data={registration}
        columns={columns}
        loading={loading}
        meta={meta}
        placeHolderSearch="Cari nama pasien, no. pendaftaran..."
      />
    </div>
  )
}

export default OutpatientPage

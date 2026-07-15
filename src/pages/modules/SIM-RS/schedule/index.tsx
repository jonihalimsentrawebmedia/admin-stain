import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetDokterJadwal } from './hooks/index.tsx'
import { ColumnsDokterJadwal } from './data/columns.tsx'

export const DoctorSchedulePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { dokterJadwal, loading, meta } = UseGetDokterJadwal({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsDokterJadwal()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup label={'Jadwal Dokter'} buttonGroup={[]} />
        <TableCustom
          columnsName={['', '']}
          data={dokterJadwal}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

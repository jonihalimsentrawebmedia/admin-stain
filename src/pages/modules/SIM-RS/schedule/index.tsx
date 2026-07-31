import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetDokterJadwal } from './hooks/index.tsx'
import { ColumnsDokterJadwal } from './data/columns.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const DoctorSchedulePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const permision = GuardCrud({ keys: 'JADWAL_DOKTER' })

  const { dokterJadwal, loading, meta } = UseGetDokterJadwal({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsDokterJadwal()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup label={'Jadwal Dokter'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Jadwal Dokter'} valueGuide="SIM_RS_SCHEDULE" /> }]} />
        {permision?.melihat && (
          <TableCustom
            columnsName={permision?.kelola ? [''] : ['action']}
            data={dokterJadwal}
            columns={columns}
            loading={loading}
            meta={meta}
          />
        )}
      </div>
    </>
  )
}

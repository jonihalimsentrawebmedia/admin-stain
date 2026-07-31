import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import {
  UseGetAgendaInboxPage,
  UseGetStatisticsAgendaInbox,
} from '@/pages/modules/E-Office/agenda/inbox/hooks'
import { useSearchParams } from 'react-router-dom'
import ColumnsInboxAgenda from '@/pages/modules/E-Office/agenda/inbox/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { FaLeftRight } from 'react-icons/fa6'
import { FaForward } from 'react-icons/fa'

export const ListAgendaInboxPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_unit = searchParams.get('id_unit') ?? ''
  const id_asal_surat = searchParams.get('id_asal_surat') ?? ''
  const tahun = searchParams.get('tahun') ?? ''

  const { institution } = UseGetUnitInstitution()
  const { statistics } = UseGetStatisticsAgendaInbox()
  const { agendaInbox, meta, loading } = UseGetAgendaInboxPage({
    page,
    limit,
    search,
    id_unit,
    id_asal_surat,
    tahun,
  })
  const columns = ColumnsInboxAgenda()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Agenda Surat Masuk'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Agenda Surat Masuk'} valueGuide="E_OFFICE_AGENDA" /> }]} />
        <SelectFilter
          name={'id_unit'}
          label={'Satuan Kerja'}
          options={
            institution?.map((row) => ({
              label: row?.nama,
              value: row?.id_satuan_organisasi,
            })) ?? []
          }
        />

        <div className="grid grid-cols-4 gap-5">
          <div className={'space-y-2 p-4 bg-white shadow drop-shadow rounded'}>
            <div className="flex items-center justify-center bg-blue-100 size-10 rounded-full">
              <p>📅</p>
            </div>
            <p>Total Agenda</p>
            <p className={'text-2xl text-primary font-semibold'}>{statistics?.total_agenda}</p>
          </div>
          <div className={'space-y-2 p-4 bg-white shadow drop-shadow rounded'}>
            <div className="flex items-center justify-center bg-blue-100 size-10 rounded-full">
              <p>▶️</p>
            </div>
            <p>Agenda Besok</p>
            <p className={'text-2xl text-primary font-semibold'}>{statistics?.agenda_besok}</p>
          </div>
          <div className={'space-y-2 p-4 bg-white shadow drop-shadow rounded'}>
            <div className="flex items-center justify-center bg-blue-100 size-10 rounded-full">
              <p>
                <FaLeftRight className={'text-gray-500'} />
              </p>
            </div>
            <p>Agenda Minggu Ini</p>
            <p className={'text-2xl text-primary font-semibold'}>{statistics?.agenda_minggu_ini}</p>
          </div>
          <div className={'space-y-2 p-4 bg-white shadow drop-shadow rounded'}>
            <div className="flex items-center justify-center bg-blue-100 size-10 rounded-full">
              <p>
                <FaForward className={'text-gray-500'} />
              </p>
            </div>
            <p>Agenda Minggu Depan</p>
            <p className={'text-2xl text-primary font-semibold'}>
              {statistics?.agenda_minggu_depan}
            </p>
          </div>
        </div>

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={agendaInbox}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}

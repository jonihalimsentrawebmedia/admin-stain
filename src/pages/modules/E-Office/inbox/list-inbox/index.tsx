import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ListMonth,
  UseGetInbox,
  UseGetInboxYear,
} from '@/pages/modules/E-Office/inbox/list-inbox/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { columnsListInbox } from '@/pages/modules/E-Office/inbox/list-inbox/data/columns.tsx'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'

export const ListInbox = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const year = searchParams.get('tahun') ?? ''
  const start_month = searchParams.get('bulan_mulai') ?? ''
  const end_month = searchParams.get('bulan_selesai') ?? ''

  const { yearInbox } = UseGetInboxYear()
  const { listInbox, meta, loading } = UseGetInbox({
    page,
    limit,
    search,
    year,
    start_month,
    end_month,
  })
  const columns = columnsListInbox()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Daftar Surat Masuk'}
          buttonGroup={[
            { type: 'custom', element: <ButtonGoToGuide titleGuide={'Daftar Surat Masuk'} valueGuide="E_OFFICE_INBOX" /> },
            {
              type: 'add',
              label: 'Tulis Surat',
              onClick: () => navigate('/modules/e-office/inbox/registration-inbox'),
            },
          ]}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <FilterSelect
            className={'w-full'}
            label={'Tahun'}
            placeholder={'Tahun'}
            data={yearInbox?.map((row) => ({
              label: row,
              value: row,
            }))}
            name={'tahun'}
          />
          <FilterSelect
            className={'w-full'}
            label={'Bulan Mulai'}
            placeholder={'Bulan Mulai'}
            data={ListMonth?.map((row, k) => ({
              label: row,
              value: k.toString(),
            }))}
            name={'bulan_mulai'}
          />
          <FilterSelect
            className={'w-full'}
            label={'Bulan Selesai'}
            placeholder={'Bulan Selesai'}
            data={ListMonth?.map((row, k) => ({
              label: row,
              value: k.toString(),
            }))}
            name={'bulan_selesai'}
          />
        </div>

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={listInbox}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}

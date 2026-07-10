import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetOutbox, UseGetOutboxYear } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { columnsListOutbox } from './data/columns'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import { ListMonth } from '@/pages/modules/E-Office/inbox/list-inbox/hooks'

export const ListOutbox = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const year = searchParams.get('tahun') ?? ''
  const start_month = searchParams.get('bulan_mulai') ?? ''
  const end_month = searchParams.get('bulan_selesai') ?? ''

  const { yearOutbox } = UseGetOutboxYear()
  const { listOutbox, meta, loading } = UseGetOutbox({
    page,
    limit,
    search,
    year,
    start_month,
    end_month,
  })
  const columns = columnsListOutbox()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Daftar Surat Keluar'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tulis Surat',
              onClick: () => navigate('/modules/e-office/outbox/registration-outbox'),
            },
          ]}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <FilterSelect
            className={'w-full'}
            label={'Tahun'}
            placeholder={'Tahun'}
            data={yearOutbox?.map((row) => ({
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
          data={listOutbox}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}

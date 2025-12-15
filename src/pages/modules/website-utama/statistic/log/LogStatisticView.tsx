import { formatDateTime } from '@/utils/date'
import useGetLogStatistic from '../controller/useGetLogStatistic'
import type { LogStatistic } from '../model'
import type { ColumnDef } from '@tanstack/react-table'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const LogStatisticView = () => {
  const { log, loading, meta } = useGetLogStatistic()

  const columns: ColumnDef<LogStatistic>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'jenis_data',
      header: 'Jenis Data',
    },
    {
      accessorKey: 'diubah_pada',
      header: 'Diperbaharui Oleh',
      cell: ({ row }) => {
        const createdAt = formatDateTime(row.original.diubah_pada)
        return (
          <div>
            {row.original.nama_user},
            <br />
            <span className="text-primary">
              {createdAt.date}, {createdAt.time}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'data_lama',
      header: 'Data Sebelumnya',
    },
    {
      accessorKey: 'data_baru',
      header: 'Data Hasil Perubahan',
    },
  ]
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Log Data - Statistik" isBack />

      <TableCustom
        addFilter={
          <SelectFilter
            selectClassName={'min-w-[8rem]'}
            label="Tampilkan"
            name={'limit'}
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
        meta={meta}
        loading={loading}
        data={log}
        isShowLimit={false}
        columns={columns}
      />
    </div>
  )
}

export default LogStatisticView

import { formatDateTime } from '@/utils/date'
import useGetActivityDetail from '../controller/useGetActivityDetail'
import useGetLogAcademicActivityDetail from '../controller/useGetLogAcademicActivityDetail'
import type { ColumnDef } from '@tanstack/react-table'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'
import type { LogStatistic } from '../../statistic/model'

const LogActivityDetailView = () => {
  const { activityDetail } = useGetActivityDetail()
  const { log } = useGetLogAcademicActivityDetail()
  const createdAt = formatDateTime(activityDetail?.created_at ?? null)
  const updatedAt = formatDateTime(activityDetail?.updated_at ?? null)
  const startAt = formatDateTime(activityDetail?.tanggal_mulai ?? null)
  const endAt = formatDateTime(activityDetail?.tanggal_selesai ?? null)
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
      <ButtonTitleGroup buttonGroup={[]} label="Log Data" isBack />
      <div>
        <div className="text-[#999999] text-sm">Uraian Kegiatan</div>
        <div className="text-green-600 font-medium text-3xl">{activityDetail?.uraian_kegiatan}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-[#999999] text-sm">Tanggal Mulai</div>
          <div className="">{startAt.date}, </div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Tanggal Selesai</div>
          <div className="">{endAt.date}, </div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">keterangan</div>
          <div className="">{activityDetail?.keterangan}</div>
        </div>

        <div>
          <div className="text-[#999999] text-sm">Diposting Oleh</div>
          <div className=" ">
            {activityDetail?.nama_user_created} {createdAt.date} , {createdAt.time}
          </div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Diperbaharui Oleh</div>
          <div className=" ">
            {activityDetail?.nama_user_updated} {updatedAt.date} , {updatedAt.time}
          </div>
        </div>
      </div>

      <TableCustom data={log} isShowFilter={false} isShowPagination={false} columns={columns} />
    </div>
  )
}

export default LogActivityDetailView

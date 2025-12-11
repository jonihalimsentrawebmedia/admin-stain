import { formatDateTime } from '@/utils/date'
import useGetActivityDetail from '../controller/useGetActivityDetail'
import useGetLogAcademicActivityDetail from '../controller/useGetLogAcademicActivityDetail'
import type { ColumnDef } from '@tanstack/react-table'
import type { LogActivity } from '../model'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'

const LogActivityDetailView = () => {
  const { activityDetail } = useGetActivityDetail()
  const { log } = useGetLogAcademicActivityDetail()
  const createdAt = formatDateTime(activityDetail?.created_at ?? null)
  const updatedAt = formatDateTime(activityDetail?.updated_at ?? null)
  const startAt = formatDateTime(activityDetail?.tanggal_mulai ?? null)
  const endAt = formatDateTime(activityDetail?.tanggal_selesai ?? null)
  const columns: ColumnDef<LogActivity>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'fieldname',
      header: 'Jenis Data',
    },
    {
      accessorKey: 'created_at',
      header: 'Diperbaharui Oleh',
      cell: ({ row }) => {
        const createdAt = formatDateTime(row.original.created_at)
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
      accessorKey: 'old_data',
      header: 'Data Sebelumnya',
    },
    {
      accessorKey: 'new_data',
      header: 'Data Hasil Perubahan',
      cell: (row) => {
        return (
          <div className="whitespace-pre-line">{JSON.stringify(row.row.original.new_data)}</div>
        )
      },
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
            {activityDetail?.updated_user} {createdAt.date} , {createdAt.time}
          </div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Diperbaharui Oleh</div>
          <div className=" ">
            {activityDetail?.updated_user} {updatedAt.date} , {updatedAt.time}
          </div>
        </div>
      </div>

      <TableCustom data={log} isShowFilter={false} isShowPagination={false} columns={columns} />
    </div>
  )
}

export default LogActivityDetailView

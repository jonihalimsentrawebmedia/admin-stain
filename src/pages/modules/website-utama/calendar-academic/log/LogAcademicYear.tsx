import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetCalendarAcademicDetail from '../controller/useGetCalendarAcademicDetail'
import { formatDateTime } from '@/utils/date'
import type { ColumnDef } from '@tanstack/react-table'
import type { LogActivity } from '../model'
import TableCustom from '@/components/common/table/TableCustom'
import useGetLogAcademicYear from '../controller/useGetLogAcademicYear'

const LogAcademicYear = () => {
  const { academicYear } = useGetCalendarAcademicDetail()
  const { log } = useGetLogAcademicYear()
  const createdAt = formatDateTime(academicYear?.created_at ?? null)
  const updatedAt = formatDateTime(academicYear?.updated_at ?? null)
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
      <ButtonTitleGroup buttonGroup={[]} label="Log Data - Statistik" isBack />
      <div>
        <div className="text-[#999999] text-sm">Nama Tahun Akademik</div>
        <div className="text-green-600 font-medium text-3xl">
          {academicYear?.nama_tahun_akademik}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-[#999999] text-sm">Tahun</div>
          <div className="">{academicYear?.tahun_akademik}</div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Semester</div>
          <div className="">{academicYear?.semester}</div>
        </div>

        <div>
          <div className="text-[#999999] text-sm">Diposting Oleh</div>
          <div className=" ">
            {academicYear?.updated_user} {createdAt.date} , {createdAt.time}
          </div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Diperbaharui Oleh</div>
          <div className=" ">
            {academicYear?.updated_user} {updatedAt.date} , {updatedAt.time}
          </div>
        </div>
      </div>

      <TableCustom data={log} isShowFilter={false} isShowPagination={false} columns={columns} />
    </div>
  )
}

export default LogAcademicYear

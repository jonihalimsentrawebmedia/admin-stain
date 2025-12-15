import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetCalendarAcademicDetail from '../controller/useGetCalendarAcademicDetail'
import { formatDateTime } from '@/utils/date'
import type { ColumnDef } from '@tanstack/react-table'
import TableCustom from '@/components/common/table/TableCustom'
import useGetLogAcademicYear from '../controller/useGetLogAcademicYear'
import type { LogStatistic } from '../../statistic/model'
import SelectFilter from '@/components/common/filter/SelectFilter'

const LogAcademicYear = () => {
  const { academicYear } = useGetCalendarAcademicDetail()
  const { log, loading, meta } = useGetLogAcademicYear()
  const createdAt = formatDateTime(academicYear?.created_at ?? null)
  const updatedAt = formatDateTime(academicYear?.updated_at ?? null)
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
      <ButtonTitleGroup link='/modules/website-utama/calendar-academic' buttonGroup={[]} label="Log Data - Statistik" isBack />
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
            {academicYear?.nama_user_created} {createdAt.date} , {createdAt.time}
          </div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Diperbaharui Oleh</div>
          <div className=" ">
            {academicYear?.nama_user_updated} {updatedAt.date} , {updatedAt.time}
          </div>
        </div>
      </div>

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
        loading={loading}
        data={log}
        isShowLimit={false}
        columns={columns}
        meta={meta}
      />
    </div>
  )
}

export default LogAcademicYear

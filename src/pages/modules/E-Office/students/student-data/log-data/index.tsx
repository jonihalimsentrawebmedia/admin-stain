import { useParams } from 'react-router-dom'
import { UseGetDetailStudentData, UseGetStudentLogStatusActive } from '../hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { ILogStudentHistory } from '../data/types.ts'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const LogColumns = (): ColumnDef<ILogStudentHistory>[] => [
  {
    accessorKey: 'order',
    header: '#',
    cell: ({ row }) => <p className="text-sm font-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'changed_at',
    header: 'Tanggal',
    cell: ({ row }) => {
      const log = row.original
      return log.changed_at ? format(new Date(log.changed_at), 'dd/MM/yyyy HH:mm') : '-'
    },
  },
  {
    accessorKey: 'old_nama_status_mahasiswa',
    header: 'Status Lama',
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.old_nama_status_mahasiswa ?? '-'}</Badge>
    ),
  },
  {
    accessorKey: 'new_nama_status_mahasiswa',
    header: 'Status Baru',
    cell: ({ row }) => <Badge>{row.original.new_nama_status_mahasiswa ?? '-'}</Badge>,
  },
  {
    accessorKey: 'old_tahun_lulus',
    header: 'Tahun Lulus (Lama)',
    cell: ({ row }) => row.original.old_tahun_lulus ?? '-',
  },
  {
    accessorKey: 'new_tahun_lulus',
    header: 'Tahun Lulus (Baru)',
    cell: ({ row }) => row.original.new_tahun_lulus ?? '-',
  },
  {
    accessorKey: 'alasan',
    header: 'Alasan',
    cell: ({ row }) => row.original.alasan ?? '-',
  },
  {
    accessorKey: 'nama_changed_user',
    header: 'Diubah Oleh',
  },
]

const LogDataStudent = () => {
  const { id } = useParams()
  const { studentData } = UseGetDetailStudentData(id as string)
  const { logStatus, loading } = UseGetStudentLogStatusActive(id as string)

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={'Log Data Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Mahasiswa'} valueGuide="E_OFFICE_STUDENTS" />,
            },
          ]}
        />

        <Card>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-xl sm:text-2xl font-semibold text-primary'}
                  title={'Detail Mahasiswa'}
                />
              </div>
              <div className="col-span-2 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex justify-center sm:block">
                  {studentData?.url_foto_mahasiswa ? (
                    <img
                      src={studentData.url_foto_mahasiswa}
                      alt="Foto Mahasiswa"
                      className="max-w-[150px] sm:max-w-[150px] w-full aspect-[3/4] object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-[120px] p-4 aspect-[3/4] bg-gray-100 rounded-lg border flex items-center justify-center text-gray-400">
                      <p className="text-xs text-center">No Photo </p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-3 gap-x-4 flex-1">
                  <span className="text-gray-500 text-sm sm:text-base">NIM</span>
                  <span className="font-medium break-words">{studentData?.nim ?? '-'}</span>

                  <span className="text-gray-500 text-sm sm:text-base">Nama Mahasiswa</span>
                  <span className="font-medium break-words">
                    {studentData?.nama_mahasiswa ?? '-'}
                  </span>

                  <span className="text-gray-500 text-sm sm:text-base">Program Studi</span>
                  <span className="font-medium break-words">{studentData?.nama_prodi ?? '-'}</span>

                  <span className="text-gray-500 text-sm sm:text-base">Fakultas</span>
                  <span className="font-medium break-words">
                    {studentData?.nama_fakultas ?? '-'}
                  </span>

                  <span className="text-gray-500 text-sm sm:text-base">Status Saat Ini</span>
                  <span className="font-medium">
                    <Badge variant="outline">{studentData?.nama_status_mahasiswa ?? '-'}</Badge>
                  </span>

                  <span className="text-gray-500 text-sm sm:text-base">Angkatan</span>
                  <span className="font-medium break-words">{studentData?.angkatan ?? '-'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-xl sm:text-2xl font-semibold text-primary'}
                  title={'Riwayat Status'}
                />
              </div>

              <div className="col-span-2">
                <TableCustom
                  isShowFilter={false}
                  data={logStatus ?? []}
                  columns={LogColumns()}
                  loading={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default LogDataStudent

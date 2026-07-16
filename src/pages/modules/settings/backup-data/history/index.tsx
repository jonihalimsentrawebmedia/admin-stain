import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'
import { Badge } from '@/components/ui/badge'
import useGetBackupHistory from './hooks'
import type { IBackupHistory } from '../model'

const BackupHistoryView = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const { histories, loading, meta } = useGetBackupHistory()

  const columns: ColumnDef<IBackupHistory>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const p = Number(page ?? 1)
        const l = Number(limit ?? '10')
        return <div>{(p - 1) * l + row.row.index + 1}</div>
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => {
        const status = row.row.original.status
        if (status === 'compressing') {
          return (
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-yellow-500" />
              <span className="text-yellow-600 font-medium">compressing</span>
            </div>
          )
        }
        return (
          <Badge className={status === 'success' ? 'bg-green-500' : 'bg-red-500'}>{status}</Badge>
        )
      },
    },
    { accessorKey: 'nama_backup_user', header: 'User Backup' },
    {
      accessorKey: 'backup_at',
      header: 'Waktu Backup',
      cell: (row) => {
        const value = row.row.original.backup_at
        return <div>{format(new Date(value), 'dd-MM-yyyy HH:mm')}</div>
      },
    },
    { accessorKey: 'nama_download_user', header: 'User Download' },
    {
      accessorKey: 'download_at',
      header: 'Waktu Download',
      cell: (row) => {
        const value = row.row.original.download_at
        return <div>{value ? format(new Date(value), 'dd-MM-yyyy HH:mm') : '-'}</div>
      },
    },
    {
      accessorKey: 'percentage',
      header: 'Progress',
      cell: (row) => <div>{row.row.original.percentage}%</div>,
    },
    {
      accessorKey: 'duration_seconds',
      header: 'Durasi',
      cell: (row) => {
        const sec = row.row.original.duration_seconds
        if (sec < 60) return <div>{sec} detik</div>
        return (
          <div>
            {Math.floor(sec / 60)} menit {sec % 60} detik
          </div>
        )
      },
    },
    {
      accessorKey: 'error_message',
      header: 'Error',
      cell: (row) => (
        <div className="max-w-[200px] truncate">{row.row.original.error_message || '-'}</div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate('/modules/settings/backup-data')}>
          <ArrowLeft />
        </Button>
        <ButtonTitleGroup buttonGroup={[]} label="Log Activity Backup" />
      </div>

      <TableCustom
        columns={columns}
        data={histories}
        loading={loading}
        meta={meta}
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
        placeHolderSearch="Cari history backup"
      />
    </div>
  )
}

export default BackupHistoryView

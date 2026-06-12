import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type {
  IMailInvitationLetterList,
  TMailStatus,
} from '@/pages/modules/E-Office/Letter-Generation/letter-list/data/types.ts'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { Label } from '@/components/ui/label.tsx'
import ButtonDeleteLetterGenerate from '@/pages/modules/E-Office/Letter-Generation/letter-list/component/buttonDelete.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdInfo } from 'react-icons/md'
import ButtonStatusOnce from '@/pages/modules/E-Office/Letter-Generation/letter-list/component/buttonStatus.tsx'
import ButtonCancelStatus from '@/pages/modules/E-Office/Letter-Generation/letter-list/component/buttonCancel.tsx'

const statusConfig: Record<TMailStatus, { label: string; className: string }> = {
  MENUNGGU: {
    label: 'Menunggu',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  SELESAI: {
    label: 'Disetujui',
    className: 'bg-green-100 text-green-800 border-green-300',
  },
  DIBATALKAN: {
    label: 'Ditolak',
    className: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  DIPROSES: {
    label: 'Diproses',
    className: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  DIHAPUS: {
    label: 'Dihapus',
    className: 'bg-red-100 text-red-800 border-red-300',
  },
}

const StatusBadge = ({ status }: { status: TMailStatus }) => {
  const config = statusConfig[status] ?? {
    label: status,
    className: 'bg-gray-100 text-gray-800 border-gray-300',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  )
}

export const ColumnsLetterGenerate = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IMailInvitationLetterList>[] = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }) => {
        return (
          <span className="text-sm font-medium text-gray-500">
            {row.index + 1 + (page - 1) * Number(limit)}
          </span>
        )
      },
    },
    {
      id: 'selected',
      header: ({ table }) => {
        return (
          <Label className={'flex items-center gap-1.5'}>
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </Label>
        )
      },
      cell: ({ row }) => {
        const { id_mail_surat_undangan } = row.original
        return (
          <div className={'flex items-center gap-1.5'}>
            <input
              key={row.index}
              disabled={!id_mail_surat_undangan}
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        )
      },
    },
    {
      accessorKey: 'nomor_surat',
      header: 'Nomor Surat',
      cell: ({ row }) => {
        return (
          <span className="text-sm font-medium text-gray-900">
            {row.original.nomor_surat || '-'}
          </span>
        )
      },
    },
    {
      accessorKey: 'perihal',
      header: 'Perihal',
      cell: ({ row }) => {
        return (
          <span className="text-sm text-gray-700 line-clamp-2 max-w-[280px]">
            {row.original.perihal}
          </span>
        )
      },
    },
    {
      accessorKey: 'nama_jenis_surat',
      header: 'Jenis Surat',
      cell: ({ row }) => {
        return <span className="text-sm text-gray-600">{row.original.nama_jenis_surat || '-'}</span>
      },
    },
    {
      accessorKey: 'tanggal_surat',
      header: 'Tanggal Surat',
      cell: ({ row }) => {
        return (
          <span className="text-sm text-gray-600">
            {row.original.tanggal_surat
              ? format(new Date(row.original.tanggal_surat), 'dd MMM yyyy', { locale: localeId })
              : '-'}
          </span>
        )
      },
    },
    {
      accessorKey: 'nama_user_created',
      header: 'Dibuat Oleh',
      cell: ({ row }) => {
        return (
          <span className="text-sm text-gray-600">{row.original.nama_user_created || '-'}</span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <StatusBadge status={row.original.status} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="flex justify-end gap-2">
            <Link
              to={`detail/${data?.id_mail_surat_undangan}`}
              className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}
            >
              <MdInfo />
            </Link>
            <Link
              to={`edit/${data?.id_mail_surat_undangan}`}
              className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}
            >
              <HiPencil />
            </Link>
            {data?.status !== 'DIHAPUS' && <ButtonDeleteLetterGenerate data={data} />}
          </div>
        )
      },
    },
    {
      accessorKey: 'action_all',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex flex-col gap-1.5">
              {data?.status !== 'DIBATALKAN' && data.status !== 'DIHAPUS' && (
                <>
                  <ButtonStatusOnce data={data} />
                  <ButtonCancelStatus data={data} />
                </>
              )}
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

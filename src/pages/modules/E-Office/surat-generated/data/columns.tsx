import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISuratGenerated } from './types'
import { FiEye } from 'react-icons/fi'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

export const ColumnsSuratGenerated = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')
  const navigate = useNavigate()

  const StatusBadge = ({ status }: { status: string }) => {
    const colorClass =
      status === 'PUBLISH'
        ? 'bg-green-100 text-green-800'
        : status === 'DRAFT'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-gray-100 text-gray-800'

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
      >
        {status}
      </span>
    )
  }

  const columns: ColumnDef<ISuratGenerated>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul Surat',
    },
    {
      accessorKey: 'nomor_surat',
      header: 'Nomor Surat',
      cell: ({ row }) => {
        return <span>{row.original.nomor_surat || '-'}</span>
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
      accessorKey: 'nama_user_created',
      header: 'Dibuat Oleh',
    },
    {
      accessorKey: 'created_at',
      header: 'Tanggal',
      cell: ({ row }) => {
        return (
          <span>
            {row.original.created_at
              ? format(new Date(row.original.created_at), 'dd MMM yyyy HH:mm', { locale: localeId })
              : '-'}
          </span>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className={'flex justify-end w-full gap-2'}>
            <button
              className={'p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600'}
              onClick={() => navigate(`detail/${data.id_surat_generated}`)}
            >
              <FiEye />
            </button>
          </div>
        )
      },
    },
  ]

  return columns
}

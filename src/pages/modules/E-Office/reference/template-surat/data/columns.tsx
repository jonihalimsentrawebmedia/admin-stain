import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITemplateSurat } from './types'
import { HiPencil } from 'react-icons/hi'
import { FiEye } from 'react-icons/fi'
import { MdOutlineFilePresent } from 'react-icons/md'
import ButtonDeleteTemplateSurat from '../component/buttonDelete'

export const ColumnsTemplateSurat = () => {
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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {status}
      </span>
    )
  }

  const columns: ColumnDef<ITemplateSurat>[] = [
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
      accessorKey: 'nama_template',
      header: 'Nama Template',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => {
        return <span className="line-clamp-2 max-w-xs">{row.original.deskripsi}</span>
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
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <button
                className={'p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600'}
                onClick={() => navigate(`detail/${data.id_template_surat}`)}
              >
                <FiEye />
              </button>
              <button
                className={'p-1.5 bg-green-600 text-white rounded hover:bg-green-700'}
                onClick={() => navigate(`generate/${data.id_template_surat}`)}
              >
                <MdOutlineFilePresent />
              </button>
              <button
                className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}
                onClick={() => navigate(`update/${data.id_template_surat}`)}
              >
                <HiPencil />
              </button>
              <ButtonDeleteTemplateSurat data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

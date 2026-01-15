import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import { MdOpenInNew } from 'react-icons/md'
import { History } from 'lucide-react'
import { ButtonEditServiceProdi } from '../components/buttonEdit'
import { ButtonDeleteServiceProdi } from '../components/buttonDelete'
import type { IServiceProdi } from './types.ts'

export const ColumnsServiceProdi = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IServiceProdi>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_layanan',
      header: 'Nama',
    },
    {
      accessorKey: 'url_layanan',
      header: 'URL',
      cell: ({ row }) => {
        return (
          <Link
            to={row.original.url_layanan}
            target="_blank"
            className="border px-4 py-2 border-[#2769CD] text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <MdOpenInNew className="text-[#2769CD] size-6" />
            Buka URL
          </Link>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Tampil',
      cell: ({ row }) => {
        return <p>{row?.original?.tampil === 'Y' ? 'Aktif' : 'Tidak Aktif'}</p>
      },
    },
    {
      accessorKey: 'id_layanan',
      header: 'log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/services/${row.original.id_prodi_layanan}/log`}
            className="border border-[#2769CD] px-4 py-2 text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <History className="text-[#2769CD] size-6" />
            Log
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditServiceProdi {...row?.original} />
            <ButtonDeleteServiceProdi {...row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

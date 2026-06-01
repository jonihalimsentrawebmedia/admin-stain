import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGuestBook } from '@/pages/modules/E-Office/gustbook/data/types.ts'
import { format } from 'date-fns'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteGuestBooks from '@/pages/modules/E-Office/gustbook/compnent/buttonDelete.tsx'

export const ColumnsGuestBooks = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '1')

  const columns: ColumnDef<IGuestBook>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'tanggal_kunjungan',
      header: 'Tanggal',
      cell: ({ row }) => {
        const data = row?.original
        const date = data?.tanggal_kunjungan

        return <p className="text-sm font-medium">{date ? format(date, 'dd/MM/yyyy') : ''}</p>
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Tamu',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center gap-2">
              <img
                src={data?.url_foto ?? '/img/noimg.png'}
                className={'w-10 h-10 object-cover rounded-full'}
              />
              <div>
                <p>{data?.nama_lengkap}</p>
                <p className="text-gray-500 text-sm">NIK. {data?.nik}</p>
              </div>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'nama_unit',
      header: 'Asal / Instansi',
    },
    {
      accessorKey: 'alamat_lengkap',
      header: 'Alamat',
    },
    {
      accessorKey: 'no_hp',
      header: 'No. HP',
    },
    {
      accessorKey: 'nama_jenis_keperluan',
      header: 'Jenis Keperluan',
    },
    {
      accessorKey: 'nama_tujuan_bertamu',
      header: 'Tujuan bertamu',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-2'}>
            <Link
              to={`edit/${data.id_buku_tamu}`}
              className={'p-1.5 text-white bg-yellow-500 hover:bg-yellow-600 rounded'}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteGuestBooks data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

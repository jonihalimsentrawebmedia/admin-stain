import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ListLetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'

export const ColumnsLetterAssigment = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const Columns: ColumnDef<ListLetterAssignment>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'tanggal_surat',
      header: 'Tanggal Surat',
      cell: ({ row }) => {
        const value = row.original.tanggal_surat
        return (
          <>
            <p>{value ? format(value, 'dd MMMM yyyy') : ''}</p>
          </>
        )
      },
    },

    {
      accessorKey: 'nomor_surat',
      header: 'Nomor Surat',
      cell: ({ row }) => row.original.nomor_surat || '-',
    },
    {
      accessorKey: 'info',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Link
              to={`info/${data?.id_mail_surat_tugas}`}
              className={
                'bg-blue-500 text-white p-1.5 hover:bg-blue-600 rounded flex items-center justify-center w-fit'
              }
            >
              <MdInfo />
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'jumlah_pegawai',
      header: 'Jumlah Pegawai',
    },

    {
      accessorKey: 'kegiatan',
      header: 'Kegiatan',
    },
  ]

  return Columns
}

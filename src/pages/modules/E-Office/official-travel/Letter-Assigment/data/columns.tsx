import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ListLetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'
import { format } from 'date-fns'
import ButtonInfoAssignment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/buttonInfo.tsx'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteLetterAssigment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/buttonDelete.tsx'
import DropdownPrint from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/dropdownPrint.tsx'

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
      header: 'Tgl. Surat',
      cell: ({ row }) => {
        const value = row.original.tanggal_surat
        return (
          <>
            <p>{value ? format(value, 'dd-MM-yyyy') : ''}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Tgl. Dibuat',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{format(data?.created_at, 'dd-MM-yyyy')}</p>
            <p>{data?.nama_user_created}</p>
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
      header: 'Info',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <ButtonInfoAssignment id={data?.id_mail_surat_tugas} />
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
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center gap-2">
              <Link
                to={`detail/${data?.id_mail_surat_tugas}`}
                className={'bg-blue-500 p-1.5 text-white hover:bg-blue-600 rounded'}
              >
                <MdInfo />
              </Link>
              <Link
                to={`edit/${data?.id_mail_surat_tugas}`}
                className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteLetterAssigment data={data} />
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'print',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <DropdownPrint data={data} />
          </>
        )
      },
    },
  ]

  return Columns
}

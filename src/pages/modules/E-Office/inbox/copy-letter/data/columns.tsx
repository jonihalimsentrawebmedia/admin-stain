import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICopyLetter } from '@/pages/modules/E-Office/inbox/copy-letter/data/types.ts'
import { formatDate } from 'date-fns'
import { MdInfo } from 'react-icons/md'

const ColumnsCopyLetter = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ICopyLetter>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <p className="text-sm">{row.index + 1 + (page - 1) * limit}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'tanggal_surat',
      header: 'Tanggal Surat',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_surat)
        return <>{date ? formatDate(date, 'dd/MM/yyyy') : ''}</>
      },
    },
    {
      accessorKey: 'nomor_surat',
      header: 'Nomor Surat',
    },
    {
      accessorKey: 'nama_jenis_surat',
      header: 'Nomor Surat',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center gap-2">
              <p
                className={'p-1.5 rounded-full px-3 w-fit'}
                style={{ backgroundColor: data?.warna_sifat_surat }}
              >
                {data?.nama_sifat_surat}
              </p>
              <p>{data?.nama_jenis_surat}</p>
            </div>
            <p>{data?.perihal}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'nama_asal_surat',
      header: 'Pengirim / Asal Surat',
    },
    {
      accessorKey: 'penerima_surat',
      header: 'Penerima Surat',
    },
    {
      accessorKey: 'tembakau_surat',
      header: 'Tembusan',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            {data?.list_tembusan?.map((row, index) => (
              <p key={index}>{row}</p>
            ))}
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center justify-center">
              <Link to={`detail/${data?.id}`}>
                <button className={'bg-blue-500 p-1.5 text-white rounded hover:bg-blue-600'}>
                  <MdInfo />
                </button>
              </Link>
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export default ColumnsCopyLetter

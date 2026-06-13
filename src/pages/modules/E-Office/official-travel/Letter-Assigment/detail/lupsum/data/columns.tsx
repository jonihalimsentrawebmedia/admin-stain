import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICostLumpSum, ILupSumAssignment } from './types.ts'
import { HiPencil } from 'react-icons/hi'
import { MdPrint } from 'react-icons/md'
import { toast } from 'react-toastify'

export const ColumnsLupSum = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ILupSumAssignment>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Pegawai',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>{data?.nama_lengkap}</p>
            <p>{data?.nip}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'jumlah_lumpsum_biaya',
      header: 'Jumlah',
      cell: ({ row }) => {
        const data = row?.original.jumlah_lumpsum_biaya
        return (
          <>
            <p className={'text-end'}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(data)}
            </p>
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
            <Link to={`${data?.id_mail_surat_tugas_pegawai}`}>
              <button className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}>
                <HiPencil />
              </button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'print l',
      header: 'cetak Lupsum',
      cell: () => {
        return (
          <>
            <button
              className={'p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600'}
              onClick={() => {
                toast.info('Tampilan Cetak Belum Tersedia Di Figma')
              }}
            >
              <MdPrint />
            </button>
          </>
        )
      },
    },
    {
      accessorKey: 'jumlah_lumpsum',
      header: 'Jumlah Rill',
      cell: ({ row }) => {
        const data = row?.original.jumlah_lumpsum
        return (
          <>
            <p className={'text-end'}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(data)}
            </p>
          </>
        )
      },
    },
  ]

  return columns
}

export const ColumnsLupSumCost = () => {
  const columns: ColumnDef<ICostLumpSum>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => row?.index + 1,
    },
    {
      accessorKey: '',
      header: 'Jenis biaya',
    },
  ]

  return columns
}

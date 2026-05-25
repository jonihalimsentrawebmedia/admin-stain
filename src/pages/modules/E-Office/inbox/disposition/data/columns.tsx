import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IDisposition } from '@/pages/modules/E-Office/inbox/disposition/data/types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'

export const ColumnsDisposition = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IDisposition>[] = [
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
      header: 'Tanggal Disposisi',
    },
    {
      accessorKey: 'tanggal_surat',
      header: 'Tanggal Surat Masuk',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>{data?.tanggal_surat ? format(data?.tanggal_surat, 'dd/MM/yyyy') : ''}</p>
          </>
        )
      },
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
      header: 'Disposisi Dari',
    },
    {
      accessorKey: 'jenis_disposisi',
      header: 'Jenis Disposisi',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p className={'capitalize'}>{data?.jenis_disposisi}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p className={'capitalize'}>{data?.status?.split('_').join(' ')}</p>
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
            <Link to={`detail/${data?.id_pejabat_surat_masuk}`} className={'flex items-center justify-center gap-2'}>
              <button className={'bg-blue-500 p-1.5 text-white rounded hover:bg-blue-600'}>
                <MdInfo />
              </button>
            </Link>
          </>
        )
      },
    },
  ]

  return columns
}

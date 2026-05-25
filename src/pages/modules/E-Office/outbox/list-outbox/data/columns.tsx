import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IOutboxList } from '../data/types.ts'
import { formatDate } from 'date-fns'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteOtbox from '@/pages/modules/E-Office/outbox/list-outbox/component/buttonDelete.tsx'

export const columnsListOutbox = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IOutboxList>[] = [
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
      accessorKey: 'tanggal_surat',
      header: 'Tanggal',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_surat)
        return <>{formatDate(date, 'dd/MM/yyyy')}</>
      },
    },
    {
      accessorKey: 'nomor_surat',
      header: 'Nomor Surat',
    },
    {
      accessorKey: 'perihal',
      header: 'Jenis Surat & Perihal',
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
      accessorKey: 'nama_penandatangan',
      header: 'Asal Surat',
    },
    {
      accessorKey: 'surat_kepada',
      header: 'Penerima Surat',
    },
    {
      accessorKey: 'disposisi',
      header: 'Disposisi',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            {data?.list_disposisi?.map((row, index) => (
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
            <div className="flex items-center justify-center gap-2">
              <Link to={`/modules/e-office/outbox/registration-outbox/detail/${data?.id}`}>
                <button className={'bg-blue-500 p-1.5 text-white rounded hover:bg-blue-600'}>
                  <MdInfo className="size-4" />
                </button>
              </Link>
              <Link to={`/modules/e-office/outbox/registration-outbox/edit/${data?.id}`}>
                <button className={'bg-yellow-500 p-1.5 text-white rounded hover:bg-yellow-600'}>
                  <HiPencil className="size-4" />
                </button>
              </Link>
              <ButtonDeleteOtbox data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

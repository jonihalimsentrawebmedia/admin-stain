import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { id } from 'date-fns/locale'
import type { IHistoryStatus } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/data/resolver.tsx'
import { FaHistory } from 'react-icons/fa'

export const columnsSetStatusActive = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IEmployee>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar_url',
      header: 'Gambar',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-2'}>
            <img
              src={data?.gambar_url}
              alt="gambar user"
              className={'object-contain size-12 w-12 h-12'}
            />
            <p>{data?.nama}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'nik',
      header: 'NIK',
    },
    {
      accessorKey: 'nama_pangkat_golongan',
      header: 'Golongan',
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Unit Kerja',
    },
    {
      accessorKey: 'nama_status_aktif',
      header: 'Status',
    },
    {
      accessorKey: 'sejak',
      header: 'Status Aktif',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>
              Aktif sejak{' '}
              {data?.sejak ? format(data?.sejak, 'dd MMMM yyyy', { locale: id }) : 'Belum Aktif'}
            </p>
          </>
        )
      },
    },
    {
      accessorKey: 'url_lampiran',
      header: 'Lampiran',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            {data?.url_lampiran ? (
              <Link to={data?.url_lampiran ?? '#'}>
                <Button
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  Buka Lampiran
                </Button>
              </Link>
            ) : (
              <p>Belum Ada Lampiran</p>
            )}
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
            <div className="flex items-center justify-end gap-2">
              <Link
                to={`edit/${data?.id_sdm}`}
                className={'p-1.5 rounded bg-yellow-500 hover:bg-yellow-600 text-white'}
              >
                <HiPencil />
              </Link>
              <Link
                to={`history/${data?.id_sdm}`}
                className={'p-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white'}
              >
                <FaHistory />
              </Link>
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export const ColumnsHistoryStatusActive = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IHistoryStatus>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_status_aktif',
      header: 'Status Aktif',
    },
    {
      accessorKey: 'sejak',
      header: 'Sejak',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>{data?.sejak ? format(data?.sejak, 'dd-MM-yyyy') : '-'}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'alasan',
      header: 'Alasan',
    },
    {
      accessorKey: 'url_lampiran',
      header: 'Lampiran',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            {data?.url_lampiran ? (
              <Link to={data?.url_lampiran ?? '#'} target="_blank">
                <Button
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  Buka Lampiran
                </Button>
              </Link>
            ) : (
              'Lampiran Tidak Ada'
            )}
          </>
        )
      },
    },
    {
      accessorKey: 'nama_diset_user',
      header: 'Diset Oleh',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>{data?.nama_diset_user}</p>
            <p>{data?.created_at ? format(data?.created_at, 'dd-MM-yyyy') : '-'}</p>
          </>
        )
      },
    },
  ]
  return columns
}

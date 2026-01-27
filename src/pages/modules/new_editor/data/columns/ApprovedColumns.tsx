import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IContentSubmission } from '@/pages/modules/new_editor/data/types/data.tsx'
import { format } from 'date-fns'
import { RenderUrl } from '@/pages/modules/website-utama/beranda/hooks/renderUrl.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'

export const ApprovedColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IContentSubmission>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'tanggal',
      header: 'Tanggal Diajukan',
      cell: (row) => {
        const values = row.row.original
        return <p>{format(values?.tanggal, 'dd-MM-yyyy')}</p>
      },
    },
    {
      accessorKey: 'nama_user',
      header: 'Diajukan Oleh',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className={'flex flex-col gap-1'}>
            <p>{values?.nama_user}</p>
            <p className={'text-green-500'}>{values?.nama_level}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_unit',
      header: 'Unit/ Ssatuan Organisasi',
    },
    {
      accessorKey: 'jenis_konten',
      header: 'Jenis Konten',
    },
    {
      accessorKey: 'judul',
      header: 'Judul ',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'tanggal_disetujui',
      header: 'Tanggal Disetujui',
      cell: ({ row }) => {
        const value = row?.original
        return (
          <div>
            <p>{value?.tanggal_disetujui ? format(value?.tanggal_disetujui, 'dd-MM-yyyy') : ''}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_disetujui',
      header: 'Yang Menyetujui',
    },
    {
      accessorKey: 'Detail',
      header: 'Detail',
      cell: ({ row }) => {
        return (
          <>
            <Link
              to={`/modules/editor/public-content/${RenderUrl(row?.original?.jenis_konten, row?.original?.id)}`}
            >
              <Button
                size={'sm'}
                variant={'outline'}
                className={'border-blue-500 text-xs text-blue-500 hover:text-blue-500'}
              >
                <FaForward />
              </Button>
            </Link>
          </>
        )
      },
    },
  ]

  return columns
}

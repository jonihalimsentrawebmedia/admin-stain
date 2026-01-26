import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IContent } from '@/pages/modules/website-utama/beranda/types/index.ts'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { RenderUrl } from '@/pages/modules/website-utama/beranda/hooks/renderUrl.tsx'
import { isEmpetyReturn } from '@/utils/helper'

export const ColumnsApprovalEditor = () => {
  const culumns: ColumnDef<IContent>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        return <>{row?.index + 1}</>
      },
    },
    {
      accessorKey: 'tanggal',
      header: 'Tanggal Diajukan',
      cell: ({ row }) => {
        return <>{format(row?.original?.tanggal, 'dd/MM/yyyy HH:mm:ss')}</>
      },
    },
    {
      accessorKey: 'nama_user',
      header: 'Diajukan Oleh',
      cell: ({ row }) => {
        return (
          <div>
            <div>{row.original.nama_user}</div>
            <div className="text-primary">{row.original.nama_level}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_unit',
      header: 'Unit/Satuan Kerja',
    },
    {
      accessorKey: 'jenis_konten',
      header: 'Jenis Konten',
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
      cell: ({ row }) => {
        return <p className={'whitespace-pre-line max-w-[200px]'}>{row?.original?.judul}</p>
      },
    },

    {
      accessorKey: 'penulis',
      header: 'Penulis',
      cell: ({ row }) => {
        return <p className={''}>{isEmpetyReturn(row.original.penulis)}</p>
      },
    },
    {
      accessorKey: 'detail',
      header: 'Detail Konten',
      cell: ({ row }) => {
        return (
          <>
            <Link
              to={`/modules/editor/public-content/${RenderUrl(row?.original?.jenis_konten, row?.original?.id)}`}
            >
              <Button
                variant={'outline'}
                className={'border-blue-500 text-blue-500 hover:text-blue-500'}
              >
                <FaForward />
                Detail
              </Button>
            </Link>
          </>
        )
      },
    },
  ]

  return culumns
}

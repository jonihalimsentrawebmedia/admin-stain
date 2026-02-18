import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { RenderUrl } from '../hooks/renderUrl'
import type { IContent } from '.'

export const ColumnsApproval = () => {
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
      accessorKey: 'jenis_konten',
      header: 'Jenis Konten',
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
      cell: ({ row }) => {
        return <p className={'whitespace-pre-line'}>{row?.original?.judul}</p>
      },
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'detail',
      header: 'Detail Konten',
      cell: ({ row }) => {
        return (
          <>
            <Link
              to={`/modules/ppid/public-content/${RenderUrl(row?.original?.jenis_konten, row?.original?.id)}`}
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

import { type ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Link, useSearchParams } from 'react-router-dom'
import type { IApplicant } from './types.tsx'

export const ColumnsApplicant = () => {
  const [searchPrams] = useSearchParams()
  const page = Number(searchPrams.get('page') || 1)
  const limit = Number(searchPrams.get('limit') || 10)

  const Columns: ColumnDef<IApplicant>[] = [
    {
      id: 'selected',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: 'Order',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_pelamar',
      header: 'Nama Pelamar',
    },
    {
      accessorKey: 'pendidikan_terakhir',
      header: 'Pendidikan Terakhir',
      cell: ({ row }) => {
        return (
          <div className={'flex flex-col gap-1.5'}>
            <p className={'capitalize'}>
              {row?.original?.pendidikan_terakhir}-{row?.original?.nama_prodi}
            </p>
            <p>{row?.original?.nama_universitas}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'email',
      header: 'Kontak',
      cell: ({ row }) => (
        <div>
          <p>{row?.original?.kontak}</p>
          <p>{row?.original?.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'url_cv',
      header: 'CV',
      cell: ({ row }) => (
        <Link to={row?.original?.url_cv ?? '#'} target={'_blank'}>
          <Button variant={'outline'} className={'border-primary text-primary hover:text-primary'}>
            <FaExternalLinkAlt className={'size-4'} />
            Lihat CV
          </Button>
        </Link>
      ),
    },
  ]

  return Columns
}

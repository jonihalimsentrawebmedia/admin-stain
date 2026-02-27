import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGUideCategory } from '../data/types'
import { ButtonEditGuideCategory } from '@/pages/modules/LPPM/research/guide/component/buttonEdit.tsx'
import { ButtonDeleteGuideCategory } from '@/pages/modules/LPPM/research/guide/component/buttonDelete.tsx'

export const ColumnsGuideCategory = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const Columns: ColumnDef<IGUideCategory>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_kategori',
      header: 'Nama Kategori',
    },
    {
      accessorKey: 'id_rencana_induk_penelitian_kategori',
      header: 'Dokumen',
      cell: ({ row }) => (
        <Link
          to={`document/${row?.original?.id_buku_panduan_kategori}`}
          className={'p-1.5 rounded border border-primary text-primary hover:text-primary px-4'}
        >
          Lihat Dokumen
        </Link>
      ),
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-2">
            <ButtonEditGuideCategory data={row.original} />
            <ButtonDeleteGuideCategory data={row.original} />
          </div>
        )
      },
    },
  ]

  return Columns
}

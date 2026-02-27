import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPLanResearchCategory } from '@/pages/modules/LPPM/research/plan/data/types.ts'
import { ButtonEditPlanning } from '@/pages/modules/LPPM/research/plan/component/buttonEdit.tsx'
import { ButtonDeletePlanning } from '@/pages/modules/LPPM/research/plan/component/buttonDelete.tsx'

export const ColumnsResearchPlan = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const Columns: ColumnDef<IPLanResearchCategory>[] = [
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
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'id_rencana_induk_penelitian_kategori',
      header: 'Dokumen',
      cell: ({ row }) => (
        <Link
          to={`document/${row?.original?.id_rencana_induk_penelitian_kategori}`}
          className={'p-1.5 rounded border border-primary text-primary hover:text-primary px-4'}
        >
          Lihat Dokumen
        </Link>
      ),
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-2">
            <ButtonEditPlanning data={row.original} />
            <ButtonDeletePlanning data={row.original} />
          </div>
        )
      },
    },
  ]

  return Columns
}

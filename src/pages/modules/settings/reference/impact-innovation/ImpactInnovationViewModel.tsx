import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import ButtonEditImpactInnovation from './components/ButtonEditImpactInnovation'
import ButtonDeleteImpactInnovation from './components/ButtonDeleteImpactInnovation'

const ImpactInnovationViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<any>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Kategori
    { accessorKey: 'nama_inovasi', header: 'Nama Kategori' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditImpactInnovation data={values} />
            <ButtonDeleteImpactInnovation data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default ImpactInnovationViewModel

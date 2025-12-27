import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import type { RegencyList } from './model'
import ButtonEditRegency from './components/ButtonEditRegency'
import ButtonDeleteRegency from './components/ButtonDeleteRegency'

const RegencyViewModel = () => {
  const [searchParams] = useSearchParams()

  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)

  const columns: ColumnDef<RegencyList>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Pangkat Golongan
    { accessorKey: 'nama_kabupaten', header: 'Nama Kabupaten' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditRegency data={values} />
            <ButtonDeleteRegency data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default RegencyViewModel

import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'

const ServiceAccreditationViewModel = () => {
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
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Pangkat Golongan
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <img src={row.original.gambar} className="w-[100px] h-[70px]" alt="" />
            <div className="text-blue-500 text-xs">100 x</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'prodi',
      header: 'Universitas / Prodi',
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
    },
    {
      accessorKey: 'nilai_akreditasi',
      header: 'Nilai Akreditasi',
    },
    {
      accessorKey: 'lembaga_penilai',
      header: 'Lembaga Penilai',
    },
    {
      accessorKey: 'no_surat_keputusan',
      header: 'No. Surat Keputusan',
    },
    {
      accessorKey: 'masa_berlaku',
      header: 'Masa Berlaku',
    },
  ]
  return {
    columns,
  }
}

export default ServiceAccreditationViewModel

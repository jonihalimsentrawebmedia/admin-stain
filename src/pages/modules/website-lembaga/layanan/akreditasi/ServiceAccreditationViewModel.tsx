import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import type { ServiceAccreditation } from './model'

const ServiceAccreditationViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<ServiceAccreditation>[] = [
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
      accessorKey: 'nama_satuan_organisasi',
      header: 'Universitas / Prodi',
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
    },
    {
      accessorKey: 'nilai_akreditas',
      header: 'Nilai Akreditasi',
    },
    {
      accessorKey: 'lembaga_penilaian',
      header: 'Lembaga Penilai',
    },
    {
      accessorKey: 'no_surat_keputusan',
      header: 'No. Surat Keputusan',
    },
    {
      accessorKey: 'mulai_berlaku',
      header: 'Masa Berlaku',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div>
            {values.mulai_berlaku.split('-').reverse().join('-')} s.d{' '}
            {values.akhir_berlaku.split('-').reverse().join('-')}
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default ServiceAccreditationViewModel

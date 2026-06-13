import type { ColumnDef } from '@tanstack/react-table'
import type { IListSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types.ts'
import { format } from 'date-fns'

export const ColumnSPPD: ColumnDef<IListSPPD>[] = [
  {
    accessorKey: 'order',
    header: '#',
    cell: ({ row }) => row.index + 1,
    size: 60,
  },
  {
    accessorKey: 'tanggal_surat',
    header: 'Tanggal Surat',
    cell: ({ row }) => {
      const data = row.original
      const date = data.tanggal_surat
      return <>{date ? format(date, 'dd MMMM yyyy') : ''}</>
    },
  },
  {
    accessorKey: 'nomor_surat',
    header: 'Nomor Surat',
    cell: ({ row }) => row.original.nomor_surat || '-',
  },
  {
    accessorKey: 'tempat_asal',
    header: 'Tempat Asal',
    cell: ({ row }) => row.original.tempat_asal || '-',
  },
  {
    accessorKey: 'tempat_tujuan',
    header: 'Tempat Tujuan',
    cell: ({ row }) => row.original.tempat_tujuan || '-',
  },
  {
    accessorKey: 'nama_jenis_transportasi',
    header: 'Transportasi',
    cell: ({ row }) => row.original.nama_jenis_transportasi || '-',
  },
  {
    accessorKey: 'jumlah_pegawai',
    header: 'Jumlah Pegawai',
    cell: ({ row }) => row.original.jumlah_pegawai ?? '-',
  },
]

import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IFooterLog } from '@/pages/modules/website-utama/settings-menu/Footer/hooks'

export const FooterColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IFooterLog>[] = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'jenis_data',
      header: 'Jenis Data',
    },
    {
      accessorKey: 'nama_user',
      header: 'Diperbarui Oleh',
    },
    {
      accessorKey: 'data_lama',
      header: 'Data Sebelumnya',
    },
    {
      accessorKey: 'data_baru',
      header: 'Data Hasil Perubahan',
    },
  ]

  return columns
}

import type { ColumnDef } from '@tanstack/react-table'
import type { IThemeProdi } from '@/pages/modules/website-prodi/settings/template-website/data/types.ts'
import { format } from 'date-fns'
import { ButtonStatus } from '@/pages/modules/website-prodi/settings/template-website/component/buttonStatus.tsx'

export const ColumnsTemplateWebsite = () => {
  const columns: ColumnDef<IThemeProdi>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'thema',
      header: 'Nama Template',
    },
    {
      accessorKey: 'active',
      header: 'Status Active',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div>
            <ButtonStatus {...(data as IThemeProdi)} />
          </div>
        )
      },
    },
    {
      accessorKey: 'tanggal_aktif',
      header: 'Tanggal Aktif',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <p>{data?.tanggal_aktif ? format(data?.tanggal_aktif, 'dd MMMM yyyy, HH:mm:ss') : '-'}</p>
        )
      },
    },
  ]

  return columns
}

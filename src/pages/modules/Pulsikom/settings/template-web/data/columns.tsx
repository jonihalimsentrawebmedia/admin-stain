import type { ColumnDef } from '@tanstack/react-table'
import type { IThemeUnit } from './types.ts'
import { format } from 'date-fns'
import { ButtonStatus } from '../component/buttonStatus.tsx'

export const ColumnsTemplateWebsite = () => {
  const columns: ColumnDef<IThemeUnit>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'image',
      header: 'Template',
      cell: ({ row }) => {
        const image = row?.original?.image
        return <img src={image} alt="gambar" className={'w-[250px] h-[100px] object-contain'} />
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
            <ButtonStatus {...(data as IThemeUnit)} />
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

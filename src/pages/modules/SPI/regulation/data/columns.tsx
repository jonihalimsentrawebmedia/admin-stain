import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRegulation } from '../data/types.ts'
import { ButtonEditRegulation } from '@/pages/modules/SPI/regulation/component/buttonEdit.tsx'
import { ButtonDeleteRegulation } from '@/pages/modules/SPI/regulation/component/buttonDelete.tsx'

export const ColumnsRegulation = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam?.get('page') ?? '1')
  const limit = Number(searchParam?.get('limit') ?? '10')

  const columns: ColumnDef<IRegulation>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_peraturan',
      header: 'Nama Peraturan',
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => {
        return (
          <Link to={row?.original?.url ?? '#'} target="_blank">
            {row?.original?.url}
          </Link>
        )
      },
    },
    {
      accessorKey: 'link',
      header: 'Link',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Link to={data?.url} target={'_blank'} className={'text-white bg-primary p-2 rounded'}>
              Kunjungi Link
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className="flex items-center gap-1.5">
            <ButtonEditRegulation data={data} />
            <ButtonDeleteRegulation data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

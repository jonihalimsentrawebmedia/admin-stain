import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IExternalPortal } from './types.ts'
import { Button } from '@/components/ui/button.tsx'
import { ButtonEditPortal } from '@/pages/modules/SPI/external-portal/component/buttonEdit.tsx'
import { ButtonDeletePortal } from '@/pages/modules/SPI/external-portal/component/buttonDelete.tsx'

export const ColumnsExternalPortal = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam?.get('page') ?? '1')
  const limit = Number(searchParam?.get('limit') ?? '10')

  const columns: ColumnDef<IExternalPortal>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'url_gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.url_gambar ?? '/noimg.png'}
            alt="gambar"
            className="w-[200px] h-[150px] object-contain"
          />
        )
      },
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link
            to={data?.url ?? '#'}
            className={'underline text-blue-500 underline-offset-8 decoration-blue-500'}
          >
            {data?.url}
          </Link>
        )
      },
    },
    {
      accessorKey: 'url',
      header: 'Link',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link to={data?.url ?? '#'}>
            <Button>Kunjungi Link</Button>
          </Link>
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
            <ButtonEditPortal data={data} />
            <ButtonDeletePortal data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

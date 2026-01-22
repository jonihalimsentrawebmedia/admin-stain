import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IUnitHeaderFooterServices } from '@/pages/modules/website-unit/services/header-footer/data/types.ts'
import { ButtonEditServiceHeaderFooter } from '@/pages/modules/website-unit/services/header-footer/component/buttonEdit.tsx'
import { ButtonDeleteServiceHeaderFooter } from '@/pages/modules/website-unit/services/header-footer/component/buttonDelete.tsx'
import ButtonActiveServices from '@/pages/modules/website-unit/services/header-footer/component/buttonPosition.tsx'

export const ColumnsHeaderFooterService = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUnitHeaderFooterServices>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_layanan',
      header: 'Nama',
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => {
        return (
          <Link to={row?.original?.url ?? '#'} target={'_blank'}>
            {row?.original?.nama_layanan}
          </Link>
        )
      },
    },
    {
      accessorKey: 'is_header',
      header: 'Posisi Header',
      cell: ({ row }) => {
        return <ButtonActiveServices data={row?.original} name={'toggle-header'} />
      },
    },
    {
      accessorKey: 'is_footer',
      header: 'Posisi Footer',
      cell: ({ row }) => {
        return <ButtonActiveServices data={row?.original} name={'toggle-footer'} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-end items-center gap-2'}>
            <ButtonEditServiceHeaderFooter {...row?.original} />
            <ButtonDeleteServiceHeaderFooter {...row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

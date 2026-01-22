import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ListServices } from '@/pages/modules/website-unit/services/list/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { FiExternalLink } from 'react-icons/fi'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import { ButtonEditListCategory } from '@/pages/modules/website-unit/services/list/component/buttonEdit.tsx'
import { ButtonDeleteListCategory } from '@/pages/modules/website-unit/services/list/component/buttonDelete.tsx'

export const ColumnsListService = (rootData: ICategoryServices) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ListServices>[] = [
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
      header: 'Nama Layanan',
    },
    {
      accessorKey: 'foto_url',
      header: 'Gambar',
      cell: ({ row }) => {
        return <img src={row?.original?.foto_url} alt="foto" className="size-32 min-w-32 object-cover" />
      },
    },
    {
      accessorKey: 'link',
      header: 'Link/Pintasan',
      cell: ({ row }) => {
        return (
          <Link to={row?.original?.link} target={'_blank'}>
            <Button variant={'outline'} className={'border-primary'}>
              <FiExternalLink />
              {row?.original?.nama_layanan}
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'kontak',
      header: 'Kontak',
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'aksi',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-end items-center gap-2'}>
            <ButtonEditListCategory rootData={rootData} data={row?.original} />
            <ButtonDeleteListCategory rootData={rootData} data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

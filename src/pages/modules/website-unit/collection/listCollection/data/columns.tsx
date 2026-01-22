import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryCollection } from '@/pages/modules/website-unit/collection/listCollection/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { ButtonEditCollectionCategory } from '@/pages/modules/website-unit/collection/listCollection/component/buttonEdit.tsx'
import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import { ButtonDeleteCollectionCategory } from '@/pages/modules/website-unit/collection/listCollection/component/buttonDelete.tsx'

export const ColumnsCategoryCollection = (rootData?: IUnitCollection) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const [collapsible, setCollapsible] = useState(true)

  const columns: ColumnDef<ICategoryCollection>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_koleksi',
      header: 'Nama Koleksi',
    },
    {
      accessorKey: 'foto_url',
      header: 'Gambar',
      cell: ({ row }) => {
        return <img src={row?.original?.foto_url} alt="foto" className="size-40 min-w-40 rounded" />
      },
    },
    {
      accessorKey: 'url',
      header: 'Link / Pintasan',
      cell: ({ row }) => {
        return (
          <Link to={row?.original?.url ?? '#'} target="_blank">
            <Button variant={'outline'} className={'border-primary'}>
              Buka Link
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
      cell: ({ row }) => {
        return (
          <div className={'bg-white p-2'}>
            <div
              className={`tiptap ProseMirror simple-editor ${collapsible ? 'line-clamp-5' : ''}`}
              dangerouslySetInnerHTML={{ __html: row?.original?.uraian ?? '' }}
            />
            <button
              onClick={() => setCollapsible(!collapsible)}
              className={'text-xs text-green-500 underline underline-offset-4 decoration-green-500'}
            >
              {collapsible ? 'Lihat Selengkapnya' : 'Lihat Lebih Sedikit'}
            </button>
          </div>
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
        return (
          <div className={'flex items-center justify-end gap-2'}>
            <ButtonEditCollectionCategory data={row?.original} rootData={rootData} />
            <ButtonDeleteCollectionCategory data={row?.original} rootData={rootData} />
          </div>
        )
      },
    },
  ]

  return columns
}

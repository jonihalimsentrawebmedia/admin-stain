import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { SubCalloborationCategory } from './model'
import { History } from 'lucide-react'
import ButtonEditSubCalloborationCategory from './components/ButtonEditSubCalloborationCategory'
import ButtonDeleteSubCalloborationCategory from './components/ButtonDeleteSubCalloborationCategory'
import { IoLanguage } from 'react-icons/io5'

const SubCalloborationCategoryViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<SubCalloborationCategory>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_kategori_kerjasama',
      header: 'Kategori Kerjasama',
    },
    {
      accessorKey: 'nama_sub_kategori',
      header: 'Sub Kategori Kerjasama',
    },
    {
      accessorKey: 'jumlah_kerjasama',
      header: 'Jumlah Kerjasama',
    },

    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/kerjasama/sub-kategori-kerjasama/${row.original.id_sub_kategori_kerjasama}/log`}
            className="border border-[#2769CD] px-4 py-2 text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <History className="text-[#2769CD] size-6" />
            Log
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`language/${row?.original?.id_sub_kategori_kerjasama}`}
              className={'bg-primary p-1.5 text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditSubCalloborationCategory data={row.original} />
            <ButtonDeleteSubCalloborationCategory data={row.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default SubCalloborationCategoryViewModel

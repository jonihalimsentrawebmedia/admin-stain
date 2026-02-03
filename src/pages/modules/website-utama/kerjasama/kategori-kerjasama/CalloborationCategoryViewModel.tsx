import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { CalloborationCategoryList } from './model'
import { History } from 'lucide-react'
import ButtonEditCalloborationCategory from './components/ButtonEditCalloborationCategory'
import ButtonDeleteCalloborationCategory from './components/ButtonDeleteCalloborationCategory'
import { IoLanguage } from 'react-icons/io5'

const CalloborationCategoryViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<CalloborationCategoryList>[] = [
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
      header: 'Nama Kategori Kerjasama',
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
            to={`/modules/website-utama/kerjasama/kategori-kerjasama/${row.original.id_kategori_kerjasama}/log`}
            className="border border-[#2769CD] px-3 py-1.5 text-[#2769CD] rounded-lg hover:text-white hover:bg-blue-500 flex gap-2 items-center w-fit"
          >
            <History className="size-4" />
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
              to={`language/${row?.original?.id_kategori_kerjasama}`}
              className={'bg-primary p-1.5 text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditCalloborationCategory data={row.original} />
            <ButtonDeleteCalloborationCategory data={row.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default CalloborationCategoryViewModel

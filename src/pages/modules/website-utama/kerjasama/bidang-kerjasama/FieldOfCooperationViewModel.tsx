import { Link, useSearchParams } from 'react-router-dom'
import type { FieldOfCooperationList } from './model'
import type { ColumnDef } from '@tanstack/react-table'
import { History } from 'lucide-react'
import ButtonEditFieldOfCooperation from './components/ButtonEditFieldOfCooperation'
import ButtonDeleteFieldOfCooperation from './components/ButtonDeleteFieldOfCooperation'
import { IoLanguage } from 'react-icons/io5'

const FieldOfCooperationViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<FieldOfCooperationList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_bidang_kerjasama',
      header: 'Nama Bidang Kerjasama',
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
            to={`/modules/website-utama/kerjasama/bidang-kerjasama/${row.original.id_bidang_kerjasama}/log`}
            className="border border-[#2769CD] px-3 py-1.5 w-fit text-[#2769CD] rounded-lg flex gap-2 items-center"
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
              to={`language/${row?.original?.id_bidang_kerjasama}`}
              className={'bg-primary p-1.5 text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditFieldOfCooperation data={row.original} />
            <ButtonDeleteFieldOfCooperation data={row.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default FieldOfCooperationViewModel

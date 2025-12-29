import { Link, useSearchParams } from "react-router-dom"
import type { TypeOfCalloborationList } from "./model"
import type { ColumnDef } from "@tanstack/react-table"
import { History } from "lucide-react"
import ButtonEditTypeOfCalloboration from "./components/ButtonEditTypeOfCalloboration"
import ButtonDeleteTypeOfCalloboration from "./components/ButtonDeleteTypeOfCalloboration"

const TypeOfCalloborationViewModel = () => {
 const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<TypeOfCalloborationList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_jenis_kerjasama',
      header: 'Nama Jenis Kerjasama',
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
            to={`/modules/website-utama/kerjasama/jenis-kerjasama/${row.original.id_jenis_kerjasama}/log`}
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
            <ButtonEditTypeOfCalloboration data={row.original} />
            <ButtonDeleteTypeOfCalloboration data={row.original} />
          </div>
        )
      },
    },
  ]


  return { columns }
}

export default TypeOfCalloborationViewModel
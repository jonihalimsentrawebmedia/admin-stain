import type { ColumnDef } from "@tanstack/react-table"
import { useSearchParams } from "react-router-dom"
import type { IInfografis } from "./model"
import ButtonSwitch from "./components/ButtonSwitch"
import ButtonEdit from "./components/ButtonEdit"
import ButtonDelete from "./components/ButtonDelete"

const InfographicsViewModel = () => {
   const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<IInfografis>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Pangkat Golongan
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return <img className="w-[344px] h-[258px]" src={row.original.url_gambar} />
      },
    },
    {
      accessorKey: 'slug',
      header: 'Status Aktif',
      cell: ({ row }) => {
        return <ButtonSwitch data={row.original} />
      },
    },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 flex-col items-center">
            <ButtonEdit data={values} />
            <ButtonDelete data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default InfographicsViewModel
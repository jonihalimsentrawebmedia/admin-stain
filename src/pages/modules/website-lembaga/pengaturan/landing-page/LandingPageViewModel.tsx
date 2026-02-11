import { Switch } from "@/components/ui/switch"
import type { ColumnDef } from "@tanstack/react-table"
import { useSearchParams } from "react-router-dom"
import ButtonEdit from "./components/ButtonEdit"
import ButtonDelete from "./components/ButtonDelete"

const LandingPageViewModel = () => {
   const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<any>[] = [
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
    { accessorKey: 'thumbnail', header: 'Thumbnail',cell:({row})=>{
        return <img className="w-[344px] h-[258px]" src={row.original.thumbnail}/>
    } },
    {
      accessorKey: 'slug',
      header: 'Status Aktif',
      cell: ({  }) => {
        return (
          <div className="flex gap-2 items-center">
            <Switch checked/>
                Aktif
          </div>
        )
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

export default LandingPageViewModel
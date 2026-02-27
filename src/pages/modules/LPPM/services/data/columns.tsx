import {Link, useSearchParams} from "react-router-dom";
import type {ColumnDef} from "@tanstack/react-table";
import type {IServices} from "@/pages/modules/LPPM/services/data/types.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {ButtonEditService} from "@/pages/modules/LPPM/services/component/buttonEdit.tsx";
import {ButtonDeleteService} from "@/pages/modules/LPPM/services/component/buttonDelete.tsx";

export const ColumnsService = () => {
  const [searchParams] = useSearchParams()
  const limit = Number(searchParams.get('limit') ?? 10)
  const page = Number(searchParams.get('page') ?? 1)

  const columns: ColumnDef<IServices>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({row}) => {
        return (page - 1) * limit + row.index + 1
      }
    },
    {
      accessorKey: 'nama_layanan',
      header: 'Nama Layanan',
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({row}) => {
        return (
          <Link
            to={row?.original?.url ?? "#"}
            target="_blank"
            className="text-primary border border-primary rounded px-4 py-1.5"
          >
            Buka URL
          </Link>
        )
      }
    },
    {
      accessorKey: 'posisi_header',
      header: 'Posisi Header',
      cell: ({row}) => {
        return (
          <Switch checked={row.original.posisi_header}/>
        )
      }
    },
    {
      accessorKey: 'posisi_bawah_landing',
      header: 'Posisi Bawah Landing',
      cell: ({row}) => {
        return (
          <Switch checked={row.original.posisi_bawah_landing}/>
        )
      }
    },
    {
      accessorKey: 'posisi_footer',
      header: 'Posisi Footer',
      cell: ({row}) => {
        return (
          <Switch checked={row.original.posisi_footer}/>
        )
      }
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan'
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({row}) => {
        return (
          <>
            <div className={'flex items-center gap-2'}>
              <ButtonEditService data={row.original}/>
              <ButtonDeleteService data={row.original}/>
            </div>
          </>
        )
      }
    }
  ]

  return columns
}
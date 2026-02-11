import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import type { ColumnDef } from '@tanstack/react-table'
import { MdOpenInNew } from 'react-icons/md'
import { Link, useSearchParams } from 'react-router-dom'

const SettingTemplateServiceViewModel = () => {
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
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return <img className="w-[344px] h-[258px]" src={row.original.thumbnail} />
      },
    },
    {
      accessorKey: 'status',
      header: 'Status ',
      cell: ({}) => {
        return (
          <div className="flex gap-2 items-center">
            <Switch checked />
            Aktif
          </div>
        )
      },
    },
    {
      accessorKey: 'tanggal',
      header: 'Tanggal Aktif',
      cell: ({}) => {
        return (
          <div>
            <div>1-2-2026, 12:00</div>
            <div>(Oleh: f)</div>
          </div>
        )
      },
    },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Lihat Demo',
      cell: () => {
    
        return (
          <Link to={'#'}>
            <Button className="border-primary text-primary">
              <MdOpenInNew />
              Demo Template Website
            </Button>
          </Link>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default SettingTemplateServiceViewModel

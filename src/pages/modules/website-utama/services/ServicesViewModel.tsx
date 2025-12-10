import type { ColumnDef } from '@tanstack/react-table'
import { Link,  useSearchParams } from 'react-router-dom'
import type { ServicesList } from './model'
import { MdOpenInNew } from 'react-icons/md'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { History } from 'lucide-react'
import ButtonEditServices from './components/ButtonEditServices'
import ButtonDeleteServices from './components/ButtonDeleteServices'

const ServicesViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ServicesList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_layanan',
      header: 'Nama',
    },
    {
      accessorKey: 'url_layanan',
      header: 'URL',
      cell: ({ row }) => {
        return (
          <Link
            to={row.original.url_layanan}
            target="_blank"
            className="border px-4 py-2 border-[#2769CD] text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <MdOpenInNew className="text-[#2769CD] size-6" />
            Buka URL
          </Link>
        )
      },
    },
    {
      accessorKey: 'header',
      header: 'Posisi Header',
      cell: ({ row }) => {
        return (
          <div className="flex items-center flex-col space-x-2">
            <Switch checked={row.original.header == 'Y'} id="airplane-mode" />
            <Label htmlFor="airplane-mode">
              {row.original.header == 'Y' ? 'Aktif' : 'Tidak Aktif'}
            </Label>
          </div>
        )
      },
    },

    {
      accessorKey: 'slider',
      header: 'Posisi Bawah Slider',
      cell: ({ row }) => {
        return (
          <div className="flex items-center flex-col space-x-2">
            <Switch checked={row.original.slider == 'Y'} id="airplane-mode" />
            <Label htmlFor="airplane-mode">
              {row.original.slider == 'Y' ? 'Aktif' : 'Tidak Aktif'}
            </Label>
          </div>
        )
      },
    },
    {
      accessorKey: 'footer',
      header: 'Posisi Footer',
      cell: ({ row }) => {
        return (
          <div className="flex items-center flex-col space-x-2">
            <Switch checked={row.original.footer == 'Y'} id="airplane-mode" />
            <Label htmlFor="airplane-mode">
              {row.original.footer == 'Y' ? 'Aktif' : 'Tidak Aktif'}
            </Label>
          </div>
        )
      },
    },
    {
      accessorKey: 'url_layanan',
      header: 'URL',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/services/${row.original.id_layanan}/log`}
       
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
            <ButtonEditServices data={row.original} />
            <ButtonDeleteServices data={row.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default ServicesViewModel

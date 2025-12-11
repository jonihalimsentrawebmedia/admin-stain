import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { ServicesList } from './model'
import { MdOpenInNew } from 'react-icons/md'

import { History } from 'lucide-react'
import ButtonEditServices from './components/ButtonEditServices'
import ButtonDeleteServices from './components/ButtonDeleteServices'
import ButtonActiveServices from './components/ButtonActiveServices'

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
        return <ButtonActiveServices data={row.original} name="header" />
      },
    },

    {
      accessorKey: 'slider',
      header: 'Posisi Bawah Slider',
      cell: ({ row }) => {
        return <ButtonActiveServices data={row.original} name="slider" />
      },
    },
    {
      accessorKey: 'footer',
      header: 'Posisi Footer',
      cell: ({ row }) => {
        return <ButtonActiveServices data={row.original} name="footer" />
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

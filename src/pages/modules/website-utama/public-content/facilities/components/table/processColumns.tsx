import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IFacilitiesDetail } from '@/pages/modules/website-utama/public-content/facilities/data'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo, MdOutlineHistory } from 'react-icons/md'
import { format } from 'date-fns'
import { TimeAgo } from '@/utils/helper.tsx'

export const ProcessColumnsFacilities = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IFacilitiesDetail>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => `${page * limit - limit + row.index + 1}`,
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => (
        <img
          src={row.original.gambar}
          alt="gambar"
          className={'w-[180px] h-[135px] object-cover'}
        />
      ),
    },
    {
      accessorKey: 'nama_fasilitas',
      header: 'Nama Fasilitas',
    },
    {
      accessorKey: 'alamat',
      header: 'Alamat',
    },
    {
      accessorKey: 'no_hp_pembantu',
      header: 'No. HP',
    },
    {
      accessorKey: 'email_pembantu',
      header: 'Email',
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_fasilitas}`}>
            <Button
              size={'sm'}
              variant={'outline'}
              className={'text-blue-500 border-blue-500 hover:text-blue-500'}
            >
              <MdOutlineHistory />
              Lihat Log
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'proses_at',
      header: 'Tgl. Diproses',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex flex-col gap-1.5 text-center">
              <p className={'text-sm'}>
                {format(row?.original?.proses_at as string, 'dd MMMM yyyy')}
              </p>
              <p className={'text-sm'}>{format(row?.original?.proses_at as string, 'HH:mm:ss')}</p>
              <p className={'text-primary text-sm'}>
                {TimeAgo(row?.original?.proses_at as string)}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <Link to={`detail/${row?.original?.id_fasilitas}`}>
              <button className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}>
                <MdInfo />
              </button>
            </Link>
          </>
        )
      },
    },
  ]

  return columns
}

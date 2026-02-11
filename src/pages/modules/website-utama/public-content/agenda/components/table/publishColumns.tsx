import type { ColumnDef } from '@tanstack/react-table'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import { Link, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo, MdOutlineHistory } from 'react-icons/md'
import { TimeAgo } from '@/utils/helper.tsx'
import { ButtonUnpublishAgenda } from '../buttonUnpublish.tsx'
import { IoLanguage } from 'react-icons/io5'

export const PublishColumnsAgenda = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IAgendaDetail>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => (
        <img
          src={row?.original?.gambar}
          alt="gambar"
          className={'w-[150px] object-cover h-[200px] rounded'}
        />
      ),
    },
    {
      accessorKey: 'judul',
      header: 'Nama Kegiatan',
    },
    {
      accessorKey: 'lokasi_kegiatan',
      header: 'Lokasi',
    },
    {
      accessorKey: 'waktu_mulai',
      header: 'Waktu',
      cell: ({ row }) => {
        const start_time = row?.original?.waktu_mulai
        const end_time = row?.original?.waktu_selesai
        return (
          <div className="flex flex-col gap-1.5 text-center">
            <p>{start_time ? format(new Date(start_time), 'dd-MM-yyyy, HH:mm:ss') : '-'}</p>
            {end_time && (
              <>
                <p className="text-gray-500">s/d</p>
                <p>{end_time ? format(new Date(end_time), 'dd-MM-yyyy, HH:mm:ss') : '-'}</p>
              </>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'published_at',
      header: 'Tgl. Publish',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex flex-col gap-1.5 text-center">
              <p className={'text-sm'}>
                {format(row?.original?.published_at as string, 'dd MMMM yyyy')}
              </p>
              <p className={'text-sm'}>
                {format(row?.original?.published_at as string, 'HH:mm:ss')}
              </p>
              <p className={'text-primary text-sm'}>
                {TimeAgo(row?.original?.published_at as string)}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_agenda}`}>
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
      accessorKey: 'status_publish',
      header: 'Aksi',
      cell: ({ row }) => {
        return <ButtonUnpublishAgenda {...row?.original} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex flex-col gap-1.5 items-center'}>
            <Link
              to={`language/${row?.original?.id_agenda}`}
              className={'bg-primary p-1.5 rounded text-white'}
            >
              <IoLanguage />
            </Link>
            <Link to={`detail/${row?.original?.id_agenda}`}>
              <button className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}>
                <MdInfo />
              </button>
            </Link>
          </div>
        )
      },
    },
  ]

  return columns
}

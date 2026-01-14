import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import { BiLinkExternal } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo, MdOutlineHistory } from 'react-icons/md'
import { format } from 'date-fns'
import { TimeAgo } from '@/utils/helper.tsx'
import { HiPencil } from 'react-icons/hi'

export const RejectionStatusColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IAnnouncement>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
  {
      accessorKey: 'diajukan_user',
      header: 'Diajukan Oleh',
      cell: ({ row }) => {
        const values = row.original
        return (
          <>
            {values.nama_ditolak}
            <br />
            {values.level_ditolak}
          </>
        )
      },
    },
    {
      accessorKey: 'nama_satuan_organisasi',
      header: 'Unit/Satuan Kerja',
      cell: ({ row }) => {
        const values = row.original
        return <>{values.nama_satuan_organisasi}</>
      },
    },
    {
      accessorKey: 'judul_pengumuman',
      header: 'Judul',
    },
    {
      accessorKey: 'isi_pengumuman',
      header: 'Deskripsi',
      cell: ({ row }) => {
        return (
          <div
            className={'line-clamp-5'}
            dangerouslySetInnerHTML={{ __html: row?.original?.isi_pengumuman }}
          />
        )
      },
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'dokumens',
      header: 'Dokumen',
      cell: ({ row }) => (
        <ul className={'flex flex-col gap-2'}>
          {row?.original?.dokumens.map((item, index) => (
            <li key={index} className={'border p-1.5 border-primary rounded'}>
              <Link
                to={item?.url_dokumen ?? '#'}
                target={'_blank'}
                className={
                  'flex items-center gap-1.5 whitespace-nowrap text-primary hover:text-primary'
                }
              >
                <BiLinkExternal className={'size-4'} />
                Dokumen {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_pengumuman}`}>
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
      accessorKey: 'ditolak_at',
      header: 'Tgl. Ditolak',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex flex-col gap-1.5 text-center">
              <p className={'text-sm'}>
                {format(row?.original?.ditolak_at as string, 'dd MMMM yyyy')}
              </p>
              <p className={'text-sm'}>{format(row?.original?.ditolak_at as string, 'HH:mm:ss')}</p>
              <p className={'text-primary text-sm whitespace-nowrap'}>
                {TimeAgo(row?.original?.ditolak_at as string)}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'alasan_ditolak',
      header: 'Alasan Ditolak',
    },
    {
      accessorKey: 'action',
      header: 'Aksi',
      cell: ({ row }) => {
        return (
          <Link to={`edit/${row?.original?.id_pengumuman}`}>
            <Button
              size={'sm'}
              variant={'outline'}
              className={'text-yellow-500 border-yellow-500 hover:text-yellow-500'}
            >
              <HiPencil />
              Perbaiki
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <Link to={`detail/${row?.original?.id_pengumuman}`}>
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

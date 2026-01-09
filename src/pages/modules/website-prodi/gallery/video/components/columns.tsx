import type { ColumnDef } from '@tanstack/react-table'
import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data/index.tsx'
import { Link, useSearchParams } from 'react-router-dom'
import { TbExternalLink } from 'react-icons/tb'
import { Button } from '@/components/ui/button.tsx'
import { MdOutlineHistory } from 'react-icons/md'
import { ButtonAddVideoProdi } from '@/pages/modules/website-prodi/gallery/video/components/buttonEdit.tsx'
import { ButtonDeleteVideoProdi } from '@/pages/modules/website-prodi/gallery/video/components/buttonDelete.tsx'

export const ColumnsVideoProdi = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IGalleryVideo>[] = [
    {
      accessorKey: '#',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return (
          <div className={'w-fit'}>
            <img
              src={row.original.thumbnail}
              alt={row.original.judul}
              className={'w-[200px] h-[150px] object-cover'}
            />
          </div>
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'link_video',
      header: 'Buka Video',
      cell: ({ row }) => {
        return (
          <Link
            to={row.original.link_video}
            target={'_blank'}
            className={
              'flex items-center gap-1 border p-2 border-primary text-primary rounded w-fit'
            }
          >
            <TbExternalLink />
            Buka Video
          </Link>
        )
      },
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_galeri_video}`}>
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
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-end gap-2 items-center'}>
            <ButtonAddVideoProdi data={row.original} />
            <ButtonDeleteVideoProdi {...row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

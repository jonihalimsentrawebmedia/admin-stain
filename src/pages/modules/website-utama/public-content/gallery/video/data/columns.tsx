import type { ColumnDef } from '@tanstack/react-table'
import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data/index.tsx'
import { Link, useSearchParams } from 'react-router-dom'
import { TbExternalLink } from 'react-icons/tb'
import { Button } from '@/components/ui/button.tsx'
import { MdOutlineHistory } from 'react-icons/md'
import { ButtonEditVideo } from '@/pages/modules/website-utama/public-content/gallery/video/components/buttonEdit.tsx'
import { ButtonDeleteVideo } from '@/pages/modules/website-utama/public-content/gallery/video/components/buttonDelete.tsx'
import { IoLanguage } from 'react-icons/io5'

export const ColumnsVideo = () => {
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
            <Link to={`language/${row?.original?.id_galeri_video}`}>
              <button className={'bg-primary p-1.5 rounded text-white'}>
                <IoLanguage />
              </button>
            </Link>
            <ButtonEditVideo {...row.original} />
            <ButtonDeleteVideo {...row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

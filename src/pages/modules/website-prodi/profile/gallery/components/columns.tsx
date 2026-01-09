import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data'
import { TbExternalLink } from 'react-icons/tb'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data/index.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'

export const ColumnsGalleryVideoProfile = () => {
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
  ]

  return columns
}

export const ColumnsGalleryAlbumProfile = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IGaleriAlbum>[] = [
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
      accessorKey: 'isi',
      header: 'Isi Galeri',
      cell: ({ row }) => (
        <Link to={`/modules/website-prodi/gallery/photo/album/${row?.original?.id_galeri_album}`}>
          <Button variant={'outline'} className={'border-primary text-primary hover:text-primary'}>
            <FaForward />
            Isi Galeri ({row?.original.jumlah_foto})
          </Button>
        </Link>
      ),
    },
  ]
  return columns
}

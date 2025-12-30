import type { ColumnDef } from '@tanstack/react-table'
import type {
  IGalleryPhotoSearch,
  IGalleryVideoSearch,
} from '@/pages/modules/website-utama/campus-life/types'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { RxExternalLink } from 'react-icons/rx'
import { ButtonSelected } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/video/buttonSelected.tsx'
import { ButtonPhotoSelected } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/photo/ButtonPhotoSelected.tsx'

export const VideoColumns = (idChange?: string) => {
  const columns: ColumnDef<IGalleryVideoSearch>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{row.index + 1}</>
      },
    },
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return (
          <img
            src={row.original.thumbnail}
            alt="thumbnail"
            className="w-20 h-10 object-cover rounded"
          />
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
          <Link to={row?.original?.link_video}>
            <Button
              variant={'outline'}
              className={'text-primary border-primary hover:text-primary'}
            >
              <RxExternalLink />
              Buka Video
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: 'Aksi',
      cell: ({ row }) => {
        return <ButtonSelected data={row?.original} idChange={idChange} />
      },
    },
  ]

  return columns
}

export const PhotoColumns = (idChange?: string) => {
  const columns: ColumnDef<IGalleryPhotoSearch>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{row.index + 1}</>
      },
    },
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return (
          <img
            src={row.original.link_foto}
            alt="thumbnail"
            className="w-20 h-10 object-cover rounded"
          />
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'action',
      header: 'Aksi',
      cell: ({ row }) => {
        return (
          <>
            <ButtonPhotoSelected data={row?.original} idChange={idChange} />
          </>
        )
      },
    },
  ]

  return columns
}

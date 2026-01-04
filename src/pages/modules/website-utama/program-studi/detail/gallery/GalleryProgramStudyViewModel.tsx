import type { ColumnDef } from '@tanstack/react-table'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { GaleriAlbum } from '../model/gallery'
import { Button } from '@/components/ui/button'
import { FaForward } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'
import type { GaleriVideo } from '../model/video'
import Cookies from 'js-cookie'

const GalleryProgramStudyViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const { id } = useParams()

  const columns: ColumnDef<GaleriAlbum>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return <img src={row.original.thumbnail} className="w-[250px] h-[180px] rounded" />
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul Galeri',
    },
    {
      accessorKey: 'jumlah_foto',
      header: 'Isi Galeri',
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => {
              navigate(
                path.includes('program-studi')
                  ? `/modules/website-utama/program-studi/${id}/galeri/${row.original.id_galeri_album}/detail`
                  : `/modules/website-utama/fakultas/${id}/galeri/${row.original.id_galeri_album}/detail`
              )
              Cookies.set('title', row.original.judul)
            }}
            variant={'outline'}
            className="border-primary text-primary hover:text-primary border"
          >
            <FaForward />
            Isi Galeri ({row.original.jumlah_foto})
          </Button>
        )
      },
    },
  ]
  const columnsVideo: ColumnDef<GaleriVideo>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return <img src={row.original.thumbnail} className="w-[250px] h-[180px] rounded" />
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul Galeri',
    },
    {
      accessorKey: 'jumlah_foto',
      header: 'Buka Video',
      cell: ({ row }) => {
        return (
          <Link
            to={row.original.link_video}
            target="_blank"
            className="border-primary flex gap-4 items-center px-4 py-2 rounded-lg w-fit text-primary hover:text-primary border"
          >
            <MdOpenInNew />
            Buka Video
          </Link>
        )
      },
    },
  ]

  return { columns, columnsVideo }
}

export default GalleryProgramStudyViewModel

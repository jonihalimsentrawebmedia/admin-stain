import type { ColumnDef } from '@tanstack/react-table'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { GaleriAlbum } from '../model/gallery'
import { Button } from '@/components/ui/button'
import { FastForward } from 'lucide-react'

const GalleryProgramStudyViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
const navigate=useNavigate()
const {id}=useParams()
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
          <Button onClick={()=>{
            navigate(`/modules/website-utama/program-studi/${id}/galeri`)
          }} variant={'outline'} className="border-primary text-primary border">
            <FastForward />
            Isi Galeri ({row.original.jumlah_foto})
          </Button>
        )
      },
    },
  ]

  return { columns }
}

export default GalleryProgramStudyViewModel

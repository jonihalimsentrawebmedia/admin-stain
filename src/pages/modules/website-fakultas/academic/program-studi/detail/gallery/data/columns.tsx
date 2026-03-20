import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button.tsx'
import { FastForward } from 'lucide-react'

export const ColumnsGalleryAlbum = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IGaleriAlbum>[] = [
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
        const data = row?.original
        return (
          <img src={data?.thumbnail} className={'w-[250px] h-[100px] object-cover'} alt="gambae" />
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'jumlah_foto',
      header: 'Isi Galeri',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Button variant={'outline'} className={'border-primary text-primary hover:text-primary'}>
            <FastForward className={'size-4'} />
            Isi Galeri ({data?.jumlah_foto})
          </Button>
        )
      },
    },
  ]

  return columns
}

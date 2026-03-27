import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGaleriAlbum } from '../data/types'
import { Button } from '@/components/ui/button.tsx'
import { ButtonEditAlbum } from '../component/buttonEdit.tsx'
import { ButtonDeleteAlbum } from '../component/buttonDelete.tsx'
import { FaForward } from 'react-icons/fa'

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
          <>
            <img
              src={data?.thumbnail}
              alt="thumbnail"
              className={'h-[150px] w-full object-contain'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'slug',
      header: 'Isi Galeri',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Link to={`album/${data?.id_galeri_album}`}>
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary'}
              >
                <FaForward />
                Isi Galeri ({data?.jumlah_foto})
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className={'flex gap-2 justify-center items-center'}>
              <ButtonEditAlbum data={data} />
              <ButtonDeleteAlbum data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

import type { ColumnDef } from '@tanstack/react-table'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data/index.tsx'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { MdOutlineHistory } from 'react-icons/md'
import { ButtonEditAlbumPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/components/buttonEdit.tsx'
import { ButtonDeleteAlbumPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/components/buttonDelete.tsx'
import { IoLanguage } from 'react-icons/io5'

export const ColumnsGalleryPhoto = () => {
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
        <Link to={`album/${row?.original?.id_galeri_album}`}>
          <Button variant={'outline'} className={'border-primary text-primary hover:text-primary'}>
            <FaForward />
            Isi Galeri ({row?.original.jumlah_foto})
          </Button>
        </Link>
      ),
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_galeri_album}`}>
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
            <Link to={`language/${row?.original?.id_galeri_album}`}>
              <button className={'bg-primary p-1.5 rounded text-white'}>
                <IoLanguage />
              </button>
            </Link>
            <ButtonEditAlbumPhoto {...row.original} />
            <ButtonDeleteAlbumPhoto {...row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

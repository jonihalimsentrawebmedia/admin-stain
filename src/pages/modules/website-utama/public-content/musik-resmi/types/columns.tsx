import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMarsMusic } from '@/pages/modules/website-utama/public-content/musik-resmi/types/index.ts'
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaPlay } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteOfficialMusic } from '@/pages/modules/website-utama/public-content/musik-resmi/components/buttonDelete.tsx'

export const ColumnsOfficialMusic = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IMarsMusic>[] = [
    {
      accessorKey: 'index',
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
      accessorKey: 'gambar_key',
      header: 'Gambar',
      cell: ({ row }) => {
        const gambar = row?.original
        return (
          <div className={'max-w-[130px]'}>
            <AspectRatio ratio={3 / 4}>
              <img src={gambar?.gambar_url} alt="image" className={'w-full h-full object-cover'} />
            </AspectRatio>
          </div>
        )
      },
    },
    {
      accessorKey: 'link_audio',
      header: 'Audio',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link to={data?.link_audio ?? '#'}>
            <Button className={'text-white bg-primary'}>
              <FaPlay />
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'download_count',
      header: 'Diunduh',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-center gap-2">
              <Link to={`edit/${data?.id_mars_musik}`} className="flex items-center gap-2">
                <button className={'bg-yellow-500 p-1.5 rounded hover:bg-yellow-600 text-white'}>
                  <HiPencil />
                </button>
              </Link>
              <ButtonDeleteOfficialMusic data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

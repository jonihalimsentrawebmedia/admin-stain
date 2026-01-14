import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo, MdOutlineHistory } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteNewsManagementEditor } from '../buttonDelete'
import { ButtonPublish2NewsManagementEditor } from '../buttonPublish2'


export const DraftStatusColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<INewsDetail>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
     {
      accessorKey: 'diajukan_user',
      header: 'Diajukan Oleh',
      cell: ({ row }) => {
        const values = row.original
        return (
          <>
            {values.nama_user_updated}
            <br />
            {/* {values.level_disetujui} */}
          </>
        )
      },
    },
    {
      accessorKey: 'nama_satuan_organisasi',
      header: 'Unit/Satuan Kerja',
      cell: ({ row }) => {
        const values = row.original
        return <>{values.nama_satuan_organisasi}</>
      },
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <div>
            {row?.original?.berita_gambar_tambahan.length > 0 ? (
              <Carousel className={'w-[300px]'}>
                <CarouselContent className={'w-fit'}>
                  {row?.original?.berita_gambar_tambahan.map((item, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={item?.gambar}
                        className={'w-[300px] h-[225px] object-cover'}
                        alt={item?.keterangan}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className={'absolute right-0 bottom-0'} />
                <CarouselPrevious className={'absolute left-0 bottom-0'} />
              </Carousel>
            ) : (
              <img
                src={row.original?.gambar}
                alt={row.original?.judul}
                className={'w-[300px] h-[225px] object-cover'}
              />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'nama_kategori_berita',
      header: 'Kategori Berita',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <>
            <Link to={`log/${row?.original?.id_berita}`}>
              <Button
                size={'sm'}
                variant={'outline'}
                className={'text-blue-500 border-blue-500 hover:text-blue-500'}
              >
                <MdOutlineHistory />
                Lihat Log
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
          <div className={'flex items-center gap-2 flex-col'}>
            <div className={'flex items-center gap-1'}>
              <Link to={`detail/${data?.id_berita}`}>
                <button className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}>
                  <MdInfo />
                </button>
              </Link>
              <Link to={`edit/${data?.id_berita}`}>
                <button className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}>
                  <HiPencil />
                </button>
              </Link>
              <ButtonDeleteNewsManagementEditor {...data} />
            </div>
            <ButtonPublish2NewsManagementEditor {...data} />
          </div>
        )
      },
    },
  ]

  return columns
}

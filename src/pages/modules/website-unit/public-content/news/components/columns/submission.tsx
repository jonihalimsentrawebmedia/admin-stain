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
import { format } from 'date-fns'
import { ButtonDraftUnit } from '../buttonDraft.tsx'

export const SubmissionStatusColumns = () => {
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
      accessorKey: 'diajukan_at',
      header: 'Tgl. Diajukan',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex flex-col items-center">
              <p className={'whitespace-pre-line'}>
                {data?.diajukan_at ? format(data?.diajukan_at, 'dd-MM-yyyy , HH:mm:ss') : '-'}
              </p>
              <ButtonDraftUnit {...data} />
            </div>
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
          <Link to={`detail/${data?.id_berita}`}>
            <button className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}>
              <MdInfo />
            </button>
          </Link>
        )
      },
    },
  ]

  return columns
}

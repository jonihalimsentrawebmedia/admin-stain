import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
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
import type { IArtikel } from '../../data/types'
import { ButtonDeleteArticleLppm } from '../buttonDelete'
import { ButtonSubmissionArticleLppm } from '../buttonSubmission'


export const DraftStatusColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IArtikel>[] = [
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
            {row?.original?.artikel_gambar_tambahan.length > 0 ? (
              <Carousel className={'w-[300px]'}>
                <CarouselContent className={'w-fit'}>
                  {row?.original?.artikel_gambar_tambahan.map((item, index) => (
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
      header: 'Judul Artikel',
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
            <Link to={`log/${row?.original?.id_artikel}`}>
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
              <Link to={`detail/${data?.id_artikel}`}>
                <button className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}>
                  <MdInfo />
                </button>
              </Link>
              <Link to={`edit/${data?.id_artikel}`}>
                <button className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}>
                  <HiPencil />
                </button>
              </Link>
              <ButtonDeleteArticleLppm {...data} />
            </div>
            <ButtonSubmissionArticleLppm {...data} />
          </div>
        )
      },
    },
  ]

  return columns
}

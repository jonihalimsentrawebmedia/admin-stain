import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo, MdOutlineHistory } from 'react-icons/md'
import { TimeAgo } from '@/utils/helper.tsx'
import { ButtonUnpublishFacilitiesUnit } from '../buttonUnpublish.tsx'
import type { IUnitFacilities } from '@/pages/modules/website-unit/public-content/Facilities/data/types.tsx'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'

export const PublishedStatusColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUnitFacilities>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => (
        <img
          src={row?.original?.gambar}
          alt="gambar"
          className={'w-[200px] min-w-[200px] object-cover h-[150px] rounded'}
        />
      ),
    },
    {
      accessorKey: 'nama_fasilitas',
      header: 'Nama Fasilitas',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => {
        return (
          <div
            className={'tiptap ProseMirror simple-editor'}
            dangerouslySetInnerHTML={{ __html: row?.original?.deskripsi ?? '' }}
          />
        )
      },
    },
    {
      accessorKey: 'unit_fasilitas_gambar_tambahan',
      header: 'Galeri',
      cell: ({ row }) => {
        return (
          <div>
            <Carousel className={'w-[300px]'}>
              <CarouselContent className={'w-fit'}>
                {row?.original?.unit_fasilitas_gambar_tambahan.map((item, index) => (
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
          </div>
        )
      },
    },
    {
      accessorKey: 'published_at',
      header: 'Tgl. Publish',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex flex-col gap-1.5 text-center">
              <p className={'text-sm'}>
                {format(row?.original?.published_at as string, 'dd MMMM yyyy')}
              </p>
              <p className={'text-sm'}>
                {format(row?.original?.published_at as string, 'HH:mm:ss')}
              </p>
              <p className={'text-primary text-sm'}>
                {TimeAgo(row?.original?.published_at as string)}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_unit_fasilitas}`}>
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
      accessorKey: 'status_publish',
      header: 'Aksi',
      cell: ({ row }) => {
        return <ButtonUnpublishFacilitiesUnit {...row?.original} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <Link to={`detail/${row?.original?.id_unit_fasilitas}`}>
              <button className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}>
                <MdInfo />
              </button>
            </Link>
          </>
        )
      },
    },
  ]

  return columns
}

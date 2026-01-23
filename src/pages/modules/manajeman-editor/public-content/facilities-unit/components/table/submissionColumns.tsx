import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo, MdOutlineHistory } from 'react-icons/md'
import { format } from 'date-fns'
import { TimeAgo } from '@/utils/helper.tsx'
import { ButtonDraftFacilities } from '../buttonDraft'
import ButtonProcessManagementEditor from '../buttonProcess'
import type { IUnitFacilities } from '../../data'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export const SubmissionColumnsFacilities = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IUnitFacilities>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => `${page * limit - limit + row.index + 1}`,
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => (
        <img
          src={row.original.gambar}
          alt="gambar"
          className={'w-[180px] h-[135px] object-cover'}
        />
      ),
    },
    {
      accessorKey: 'nama_fasilitas',
      header: 'Nama Fasilitas',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi Fasilitas',
    },
    {
      accessorKey: 'keterangan_gambar',
      header: 'Galeri Fasilitas',
      cell: ({ row }) => {
        return (
          <div>
            {row?.original?.unit_fasilitas_gambar_tambahan.length > 0 ? (
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
            ) : (
              <img
                src={row.original?.gambar}
                alt={row.original?.keterangan_gambar}
                className={'w-[300px] h-[225px] object-cover'}
              />
            )}
          </div>
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
      accessorKey: 'diajukan_at',
      header: 'Tgl.Diajukan',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex flex-col gap-1.5 text-center">
              <p className={'text-sm'}>
                {format(row?.original?.diajukan_at as string, 'dd MMMM yyyy')}
              </p>
              <p className={'text-sm'}>
                {format(row?.original?.diajukan_at as string, 'HH:mm:ss')}
              </p>
              <p className={'text-primary text-sm'}>
                {TimeAgo(row?.original?.diajukan_at as string)}
              </p>
              <div className="flex flex-col gap-2 justify-center items-center">
                <ButtonDraftFacilities {...row?.original} />
                <ButtonProcessManagementEditor {...row.original} />
              </div>
            </div>
          </>
        )
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

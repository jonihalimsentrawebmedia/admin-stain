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
import { format } from 'date-fns'
import type { IPromotion } from '@/pages/modules/new_editor/publict-content/promotion/data/types'
import { ButtonDraftPromotionEditor } from '../buttonDraft'
import ButtonProcessManagementEditor from '../../../../../new_editor/publict-content/promotion/component/buttonProcess.tsx'

export const SubmissionStatusColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IPromotion>[] = [
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
            {values.nama_diajukan}
            <br />
            {values.level_diajukan}
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
            {row?.original?.promosi_gambar_tambahan.length > 0 ? (
              <Carousel className={'w-[300px]'}>
                <CarouselContent className={'w-fit'}>
                  {row?.original?.promosi_gambar_tambahan.map((item, index) => (
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
      header: 'Judul Promosi',
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
            <Link to={`log/${row?.original?.id_promosi}`}>
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
              <div className="flex flex-col gap-2 items-center justify-center">
                <ButtonDraftPromotionEditor {...data} />
                <ButtonProcessManagementEditor {...data} />
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
        const data = row?.original
        return (
          <Link to={`detail/${data?.id_promosi}`}>
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

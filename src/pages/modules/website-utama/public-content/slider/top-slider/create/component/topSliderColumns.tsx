import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IListSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { RxExternalLink } from 'react-icons/rx'

const TOpSliderColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IListSlider>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'img',
      header: 'Gambar',
      cell: ({ row }) => {
        const img = row?.original?.gambar
        return <img src={img} alt="img" className="w-[290px] h-[174px] rounded object-cover" />
      },
    },
    {
      accessorKey: 'desc',
      header: 'Keterangan',
      cell: ({ row }) => {
        const desc = row?.original?.keterangan ?? '-'
        return <div dangerouslySetInnerHTML={{ __html: desc }} className="whitespace-pre-line" />
      },
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => {
        const url = row?.original?.url ?? '#'
        return (
          <Link to={url} target={'_blank'}>
            <Button
              variant={'outline'}
              className={'w-fit border-primary text-primary hover:text-primary'}
            >
              <RxExternalLink />
              Buka URL
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const id = row?.original?.id_slider_atas
        return (
          <>
            <Link to={`edit/${id}`}>
              <button className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}>
                <HiPencil />
              </button>
            </Link>
          </>
        )
      },
    },
  ]

  return columns
}

export default TOpSliderColumns

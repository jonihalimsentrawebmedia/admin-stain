import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IListSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import { Button } from '@/components/ui/button.tsx'
import { RxExternalLink } from 'react-icons/rx'
import { format } from 'date-fns'
import { TimeAgo } from '@/utils/helper.tsx'
import { ButtonUnPublished } from '@/pages/modules/website-utama/public-content/slider/top-slider/components/buttonUnpublish.tsx'

const PublishedColumns = () => {
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
      accessorKey: 'date',
      header: 'Tgl Publish',
      cell: ({ row }) => {
        return (
          <div className={'flex flex-col gap-1.5 items-center'}>
            <p className={'text-xs'}>
              {format(row?.original?.published_at as string, 'dd MMMM yyyy')}
            </p>
            <p className={'text-xs'}>{format(row?.original?.published_at as string, 'HH:mm:ss')}</p>
            <p className={'text-xs text-primary'}>
              {TimeAgo(row?.original?.published_at as string)}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: 'action',
      header: 'Aksi',
      cell: ({ row }) => {
        return (
          <div className={'flex flex-col gap-1.5 items-center'}>
            <ButtonUnPublished data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

export default PublishedColumns

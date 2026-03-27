import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGaleriVideo } from '../data/types'
import { Button } from '@/components/ui/button.tsx'
import { BiLinkExternal } from 'react-icons/bi'
import { ButtonEditVideo } from '../component/buttonEdit.tsx'
import { ButtonDeleteVideo } from '../component/buttonDelete.tsx'

export const ColumnsGalleryVideo = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IGaleriVideo>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <img
              src={data?.thumbnail}
              alt="thumbnail"
              className={'h-[150px] w-full object-contain'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'link_video',
      header: 'Buka Video',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Link to={data?.link_video} target={'_blank'}>
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary'}
              >
                <BiLinkExternal />
                Buka Video
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
          <>
            <div className={'flex gap-2 justify-center items-center'}>
              <ButtonEditVideo data={data} />
              <ButtonDeleteVideo data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

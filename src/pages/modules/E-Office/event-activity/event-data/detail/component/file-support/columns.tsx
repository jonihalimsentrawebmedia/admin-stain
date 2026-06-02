import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IDocumentEvent } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/file-support/hooks.tsx'
import { RiShareBoxFill } from 'react-icons/ri'
import ButtonEditFileSupport from '@/pages/modules/E-Office/event-activity/event-data/detail/component/file-support/buttonEdit.tsx'
import { ButtonDeleteEventFile } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/file-support/buttonDelete.tsx'

export const ColumnsFileSupport = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IDocumentEvent>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'jenis_file',
      header: 'Lihat File',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            {data?.jenis_file === 'DOKUMEN' ? (
              <Link
                to={data?.dokumen}
                className={
                  'flex items-center gap-1.5 border border-primary text-primary p-1.5 w-fit rounded'
                }
              >
                <RiShareBoxFill />
                Buka Dokumen
              </Link>
            ) : (
              <Link
                to={data?.url_file}
                className={
                  'flex items-center gap-1.5 border border-primary text-primary p-1.5 w-fit rounded'
                }
              >
                <RiShareBoxFill />
                Buka URL
              </Link>
            )}
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
          <div className={'flex items-center justify-end gap-2'}>
            <ButtonEditFileSupport data={data} />
            <ButtonDeleteEventFile data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

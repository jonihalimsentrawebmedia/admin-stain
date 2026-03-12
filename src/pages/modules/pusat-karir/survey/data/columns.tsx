import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'

export const SurveyColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISurveyQuestion>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'created_at',
      header: 'Dibuat',
      cell: ({ row }) => {
        return <>{row.original.created_at ? format(row?.original.created_at, 'dd-MM-yyyy') : ''}</>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <>
          <div className={'flex justify-center gap-1.5'}>
            <Link
              to={`${row?.original?.id_survei_pertanyaan}/detail`}
              className={'p-1.5 bg-blue-500 flex w-fit rounded text-white'}
            >
              <MdInfo className={'size-4'} />
            </Link>
            <Link
              to={`${row?.original?.id_survei_pertanyaan}/edit`}
              className={'p-1.5 bg-yellow-500 flex w-fit rounded text-white'}
            >
              <HiPencil className={'size-4'} />
            </Link>
          </div>
        </>
      ),
    },
  ]

  return columns
}

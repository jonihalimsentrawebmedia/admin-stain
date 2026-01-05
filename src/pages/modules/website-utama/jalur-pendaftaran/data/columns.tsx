import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { ChangeStatus } from '@/pages/modules/website-utama/jalur-pendaftaran/components/changeStatus.tsx'
import { ButtonDeleteRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/components/buttonDelete.tsx'

export const ColumnsRegistrationPath = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IRegistrationPath>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_jalur_pendaftaran',
      header: 'Nama Jalur Pendaftaran',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => {
        return (
          <>
            <div
              className={'tiptap ProseMirror simple-editor'}
              dangerouslySetInnerHTML={{ __html: row?.original?.deskripsi ?? '' }}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <ChangeStatus {...row.original} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex gap-2 items-center justify-end'}>
            <Link to={`edit/${row?.original?.id_jalur_pendaftaran ?? ''}`}>
              <button className={'p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600'}>
                <HiPencil />
              </button>
            </Link>
            <ButtonDeleteRegistrationPath data={row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

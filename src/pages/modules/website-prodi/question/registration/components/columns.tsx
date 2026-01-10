import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/types.ts'

export const ColumnsRegistrationProdi = () => {
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
  ]

  return columns
}

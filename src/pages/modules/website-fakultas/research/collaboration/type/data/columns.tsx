import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import type { TypeCollaboration } from '../data/types.ts'
import { ButtonEditType } from '@/pages/modules/website-fakultas/research/collaboration/type/component/buttonEdit.tsx'
import { ButtonDeleteTypeCollaboration } from '@/pages/modules/website-fakultas/research/collaboration/type/component/buttonDelete.tsx'

export const ColumnsTypeCollaboration = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<TypeCollaboration>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Program Pendidikan',
    },
    {
      accessorKey: 'deskripsi_program_pendidikan',
      header: 'Deskripsi',
      cell: ({ row }) => {
        const data = row?.original
        return <RenderHTMLContent content={data?.deskripsi ?? ''} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex items-center gap-1.5">
              <ButtonEditType data={row?.original} />
              <ButtonDeleteTypeCollaboration data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

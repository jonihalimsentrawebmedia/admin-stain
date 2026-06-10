import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMailTypeLetterTemplate } from '../data/types.ts'
import ButtonEditTemplateLetterType from '../component/buttonEdit.tsx'
import ButtonDeleteTemplateLetterType from '../component/buttonDelete.tsx'

export const IMailTemplateTypeColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IMailTypeLetterTemplate>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
      cell: ({ row }) => {
        const data = row.original
        return <div dangerouslySetInnerHTML={{ __html: data?.uraian ?? '' }} />
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center gap-1.5 justify-center">
              <ButtonEditTemplateLetterType data={data} />
              <ButtonDeleteTemplateLetterType data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

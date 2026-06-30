import type { ColumnDef } from '@tanstack/react-table'
import type { IMailIsiTemplateSurat } from '../data/types.ts'
import ButtonEditIsiTemplate from '../component/buttonEdit.tsx'
import ButtonDeleteIsiTemplate from '../component/buttonDelete.tsx'
import { useSearchParams } from 'react-router-dom'

export const IMailIsiTemplateColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IMailIsiTemplateSurat>[] = [
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
          <div className="flex items-center gap-1.5 justify-center">
            <ButtonEditIsiTemplate data={data} />
            <ButtonDeleteIsiTemplate data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

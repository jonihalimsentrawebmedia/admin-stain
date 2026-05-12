import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IContentEntrance } from '@/pages/modules/PMB/entrance/content/data/types.ts'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import ButtonEditContentEntrance from '@/pages/modules/PMB/entrance/content/component/buttonEdit.tsx'
import ButtonDeleteContentEntrance from '@/pages/modules/PMB/entrance/content/component/buttonDelete.tsx'

export const ColumnsContent = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IContentEntrance>[] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'judul_konten',
      header: 'Judul',
    },
    {
      accessorKey: 'isi_konten',
      header: 'Isi Konten',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <RenderHTMLContent content={data?.isi_konten ?? ''} />
          </>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-end gap-1.5">
              <ButtonEditContentEntrance data={data} />
              <ButtonDeleteContentEntrance data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

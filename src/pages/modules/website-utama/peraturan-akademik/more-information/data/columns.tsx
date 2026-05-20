import { useSearchParams } from 'react-router-dom'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMoreInformation } from '@/pages/modules/website-utama/peraturan-akademik/more-information/data/resolver.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import ButtonEditMoreInformation from '@/pages/modules/website-utama/peraturan-akademik/more-information/component/buttonEdit.tsx'
import ButtonDeleteMoreInformation from '@/pages/modules/website-utama/peraturan-akademik/more-information/component/buttonDelete.tsx'

export const ColumnsMoreInformation = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IMoreInformation>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row?.index + 1}</>,
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'isi',
      header: 'Isi',
      cell: ({ row }) => {
        const data = row?.original
        return <RenderHTMLContent content={data?.isi ?? ''} />
      },
    },
    {
      accessorKey: 'publish',
      header: 'Publish',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Switch checked={data?.publish} />
          </>
        )
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
        const data = row?.original
        return (
          <div className={'flex gap-2 justify-end'}>
            <ButtonEditMoreInformation data={data} />
            <ButtonDeleteMoreInformation data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

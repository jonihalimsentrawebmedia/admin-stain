import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IAwardList } from '@/pages/modules/SPI/award/hooks'
import { ButtonEditAward } from '@/pages/modules/SPI/award/component/buttonEdit.tsx'
import { ButtonDeleteAward } from '@/pages/modules/SPI/award/component/buttonDelete.tsx'

export const ColumnsAward = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam?.get('page') ?? '1')
  const limit = Number(searchParam?.get('limit') ?? '10')

  const columns: ColumnDef<IAwardList>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'url',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.url_gambar}
            alt="gambar"
            className="min-w-[360px] h-[255px] object-cover"
          />
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
          <div className="flex items-center gap-1.5">
            <ButtonEditAward data={data} />
            <ButtonDeleteAward data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

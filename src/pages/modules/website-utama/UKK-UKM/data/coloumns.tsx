import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { FaForward } from 'react-icons/fa'
import type { IUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/data/types.ts'
import ButtonEditUkkUkm from '@/pages/modules/website-utama/UKK-UKM/component/buttonEdit.tsx'
import ButtonDeleteUkkUkm from '@/pages/modules/website-utama/UKK-UKM/component/buttonDelete.tsx'

export const ColoumnsUkkUkm = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUkkUkm>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_ukk_ukm',
      header: 'Nama ukk & UKM',
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
          <div className="flex gap-2 items-center">
            <Link
              to={`detail/${data.id_ukk_ukm}`}
              className={'bg-blue-500 p-1.5 text-white rounded hover:bg-blue-600'}
            >
              <FaForward />
            </Link>
            <ButtonEditUkkUkm data={data} />
            <ButtonDeleteUkkUkm data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

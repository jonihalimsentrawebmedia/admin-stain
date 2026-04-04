import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IAdvantage } from '@/pages/modules/Pulsikom/advantage/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteAdvantage } from '@/pages/modules/Pulsikom/advantage/component/buttonDelete.tsx'

export const ColumnsAdvantage = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IAdvantage>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'url_gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.url_gambar}
            alt="gambar"
            className="w-[75px] h-[75px] object-cover"
          />
        )
      },
    },
    {
      accessorKey: 'nama_keunggulan',
      header: 'Nama Keunggulan',
    },
    {
      accessorKey: 'deskripsi_keunggulan',
      header: 'Deskripsi Keunggulan',
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
          <>
            <div className="flex items-center gap-1.5">
              <Link
                to={`edit/${data?.id_keunggulan}`}
                className={'p-1.5 text-white bg-yellow-500 rounded hover:bg-yellow-600'}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteAdvantage data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

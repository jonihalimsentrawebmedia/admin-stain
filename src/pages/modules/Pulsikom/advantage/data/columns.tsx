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
            className="w-[50px] h-[50px] object-cover size-[50px]"
          />
        )
      },
    },
    {
      accessorKey: 'nama_keunggulan',
      header: 'Nama Keunggulan',
    },
    {
      accessorKey: 'deskripsi_singkat',
      header: 'Deskripsi Singkat',
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

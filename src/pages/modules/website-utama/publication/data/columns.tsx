import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IYearPublication } from '@/pages/modules/website-utama/publication/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import ButtonEditPublication from '@/pages/modules/website-utama/publication/component/buttonEdit.tsx'
import ButtonDeletePublication from '@/pages/modules/website-utama/publication/component/buttonDelete.tsx'

export const ColumnsPublication = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IYearPublication>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_tahun_publikasi',
      header: 'Tahun',
    },
    {
      accessorKey: 'id_tahun_publikasi',
      header: 'Daftar Publikasi',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="flex gap-2 items-center">
            <Link to={`list/${data?.id_tahun_publikasi}`}>
              <Button variant="outline" className="text-primary border-primary hover:text-primary">
                Lihat Daftar Publikasi
              </Button>
            </Link>
          </div>
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
        const data = row.original
        return (
          <div className={'flex gap-2 items-center'}>
            <ButtonEditPublication data={data} />
            <ButtonDeletePublication data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

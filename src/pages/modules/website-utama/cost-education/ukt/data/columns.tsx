import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IListCostEducation } from '@/pages/modules/website-utama/cost-education/ukt/data/types.ts'
import { Check } from 'lucide-react'
import { BiX } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'

export const ColumnsEducationCost = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IListCostEducation>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_prodi',
      header: 'Prodi',
    },
    {
      accessorKey: 'nama_fakultas',
      header: ' Fakultas',
    },
    {
      accessorKey: 'nama_jenjang',
      header: 'Jenjang',
      cell: ({ row }) => {
        const data = row.original
        return <p>{data?.nama_jenjang}</p>
      },
    },
    {
      accessorKey: 'publish',
      header: 'Publish',
      cell: ({ row }) => {
        const data = row.original
        return (
          <p className={'flex gap-1 items-center'}>
            {data?.publish ? (
              <Check className={'size-4 text-green-500'} />
            ) : (
              <BiX className={'size-4 text-red-500'} />
            )}
            {data?.publish ? 'Ya' : 'Tidak'}
          </p>
        )
      },
    },
    {
      accessorKey: 'ukt',
      header: 'UKT',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link to={`${data?.id_satuan_organisasi}`}>
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
            >
              Lihat UKT
            </Button>
          </Link>
        )
      },
    },
  ]

  return columns
}

import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISpecialization } from '@/pages/modules/pusat-karir/reference/specialization/data/types.ts'
import { ButtonEditSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/component/buttonEdit.tsx'
import { ButtonDeleteSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/component/buttonDelete.tsx'

export const ColumnsSpecialization = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ISpecialization>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama_spesialisasi',
      header: 'Nama Specialisasi',
    },
    {
      accessorKey: 'id_spesialisasi',
      header: 'Sub Specialisasi',
      cell: ({ row }) => {
        return (
          <Link
            to={`${row?.original?.id_spesialisasi}/sub-specialization`}
            className={'border border-primary text-primary p-1.5 w-fit rounded'}
          >
            Lihat Sub Specialisasi
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-center items-center gap-2'}>
            <ButtonEditSpecialization data={row.original} />
            <ButtonDeleteSpecialization data={row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

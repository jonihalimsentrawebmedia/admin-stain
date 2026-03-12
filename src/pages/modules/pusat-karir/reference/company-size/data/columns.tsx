import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICompanySize } from '@/pages/modules/pusat-karir/reference/company-size/data/types.ts'
import { ButtonEditCompanySize } from '@/pages/modules/pusat-karir/reference/company-size/component/buttonEdit.tsx'
import { ButtonDeleteCompanySize } from '@/pages/modules/pusat-karir/reference/company-size/component/buttonDelete.tsx'

export const ColumnsCompanySize = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ICompanySize>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'jumlah_terendah',
      header: 'Jlh Karyawan (Paling Sedikit)',
    },
    {
      accessorKey: 'jumlah_teratas',
      header: 'Jlh Karyawan (Paling Banyak)',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className={'flex justify-center items-center gap-2'}>
              <ButtonEditCompanySize data={row.original} />
              <ButtonDeleteCompanySize data={row.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

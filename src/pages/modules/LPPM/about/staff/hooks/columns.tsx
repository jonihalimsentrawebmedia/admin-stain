import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGroupStaff } from '@/pages/modules/LPPM/about/staff/hooks/types.ts'
import { ButtonEditStaffLPPM } from '@/pages/modules/LPPM/about/staff/component/buttonEdit.tsx'
import { ButtonDeleteStaffLPPM } from '@/pages/modules/LPPM/about/staff/component/buttonDelete.tsx'

export const ColumnsStaff = () => {
  const [searchParams] = useSearchParams()
  const limit = Number(searchParams.get('limit') ?? 10)
  const page = Number(searchParams.get('page') ?? 1)

  const columns: ColumnDef<IGroupStaff>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_kelompok',
      header: 'Nama Kelompok',
    },
    {
      accessorKey: 'id_staff',
      header: 'Dafatar Anggota',
      cell: ({ row }) => (
        <>
          <Link
            className={'p-1.5 border border-primary text-primary text-sm w-fit px-4 rounded'}
            to={`member/${row?.original.id_staff}`}
          >
            Lihat Daftar Anggota
          </Link>
        </>
      ),
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
          <div className={'flex gap-2 items-center'}>
            <ButtonEditStaffLPPM {...row?.original} />
            <ButtonDeleteStaffLPPM {...row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

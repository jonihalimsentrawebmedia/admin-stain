import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMemberStaff } from '@/pages/modules/LPPM/about/staff/member/hooks/types.ts'
import { Switch } from '@/components/ui/switch.tsx'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteMemberStaff } from '@/pages/modules/LPPM/about/staff/member/component/buttonDelete.tsx'

export const ColumnsMemberStaff = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IMemberStaff>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'url_gambar',
      header: 'Foto',
      cell: ({ row }) => {
        return (
          <img
            src={row.original.url_gambar}
            alt="foto"
            className={'w-[100px] rounded h-[140px] object-cover'}
          />
        )
      },
    },
    {
      accessorKey: 'nama_anggota',
      header: 'Nama Lengkap',
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <Switch checked={row.original.status} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex gap-2 items-center'}>
            <Link
              to={`edit/${row?.original?.id_staff_anggota}`}
              className={'text-white bg-yellow-500 p-1.5 rounded hover:bg-yellow-600'}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteMemberStaff data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

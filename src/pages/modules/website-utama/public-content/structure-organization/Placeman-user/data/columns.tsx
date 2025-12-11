import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPlacemanUser } from '../data/index'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { ButtonEditPlaceman } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/buttonEdit.tsx'
import {
  ButtonDeletePlaceman
} from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/buttonDelete.tsx'

export const ColumnsUserPlaceman = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IPlacemanUser>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row?.index + 1}</>
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Nama',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'nama_golongan',
      header: 'Pangkat/Gol. Ruang',
    },
    {
      accessorKey: 'nama_akademik',
      header: 'Pangkat Akademik',
    },
    {
      accessorKey: 'no_hp',
      header: 'No. HP',
      cell: ({ row }) => {
        return (
          <>
            <p>{row?.original?.no_hp}</p>
            <label htmlFor="hp" className={'flex items-center gap-1 text-xs'}>
              <Checkbox checked={row?.original?.show_no_hp_public} />
              <span
                className={`ml-1.5 ${row?.original?.show_email_public ? 'text-green-500' : 'text-gray-500'}`}
              >
                {row?.original?.show_no_hp_public ? 'Tampil' : 'Tidak Tampil'}
              </span>
            </label>
          </>
        )
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        return (
          <>
            <p>{row?.original?.email}</p>
            <label htmlFor="hp" className={'flex items-center gap-1 text-xs'}>
              <Checkbox checked={row?.original?.show_email_public} />
              <span
                className={`ml-1.5 ${row?.original?.show_email_public ? 'text-green-500' : 'text-gray-500'}`}
              >
                {row?.original?.show_email_public ? 'Tampil' : 'Tidak Tampil'}
              </span>
            </label>
          </>
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
      cell: ({ row }) => (
        <div className={'flex flex-col gap-2 w-fit'}>
          <ButtonEditPlaceman {...row?.original} />
          <ButtonDeletePlaceman {...row?.original} />
        </div>
      ),
    },
  ]

  return columns
}

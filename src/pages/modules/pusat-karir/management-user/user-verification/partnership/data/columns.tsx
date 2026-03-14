import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPartnershipRegistered } from './types.ts'
import { Button } from '@/components/ui/button.tsx'
import { ButtonDeletePartnership } from '@/pages/modules/pusat-karir/management-user/user-verification/partnership/component/buttonDelete.tsx'

export const ColumnsPendingPartnership = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IPartnershipRegistered>[] = [
    {
      id: 'selected',
      header: ({ table }) => {
        const verifiedRows = table.getRowModel().rows.filter((row) => row.original.is_verified)
        const allVerifiedSelected =
          verifiedRows.length > 0 && verifiedRows.every((row) => row.getIsSelected())
        const handleToggleVerified = (e: React.ChangeEvent<HTMLInputElement>) => {
          const checked = e.target.checked
          verifiedRows.forEach((row) => {
            row.toggleSelected(checked)
          })
        }
        return (
          <input type="checkbox" checked={allVerifiedSelected} onChange={handleToggleVerified} />
        )
      },

      cell: ({ row }) => {
        const { is_verified } = row.original
        return (
          <input
            key={row.index}
            disabled={!is_verified}
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
    },
    {
      header: '#',
      accessorKey: 'no',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      header: 'Nama',
      accessorKey: 'nama',
    },
    {
      header: 'Perusahaan',
      accessorKey: 'perusahaan',
    },
    {
      accessorKey: 'no_handphone',
      header: 'No.Handphone',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const { email, is_verified } = row.original
        return (
          <>
            <div className="flex gap-1.5 flex-col">
              <p>{email}</p>
              <p className={is_verified ? 'text-primary font-semibold' : 'text-gray-500 italic'}>
                {is_verified ? 'Sudah Verifikasi' : 'Belum Verifikasi'}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'tanggal_mendaftar',
      header: 'Tanggal Mendaftar',
    },
    {
      accessorKey: 'action',
      header: 'Periksa Data',
      cell: ({ row }) => {
        const { id_mitra_kerja } = row.original

        return (
          <>
            <Link to={`partnership/${id_mitra_kerja}`}>
              <Button
                variant={'outline'}
                className={'text-primary border-primary hover:text-primary'}
              >
                Periksa Data
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <ButtonDeletePartnership data={row.original} />
          </>
        )
      },
    },
  ]

  return columns
}

export const ColumnsRevisionPartnership = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IPartnershipRegistered>[] = [
    {
      id: 'selected',
      header: ({ table }) => {
        const verifiedRows = table.getRowModel().rows.filter((row) => row.original.is_verified)
        const allVerifiedSelected =
          verifiedRows.length > 0 && verifiedRows.every((row) => row.getIsSelected())
        const handleToggleVerified = (e: React.ChangeEvent<HTMLInputElement>) => {
          const checked = e.target.checked
          verifiedRows.forEach((row) => {
            row.toggleSelected(checked)
          })
        }
        return (
          <input type="checkbox" checked={allVerifiedSelected} onChange={handleToggleVerified} />
        )
      },

      cell: ({ row }) => {
        const { is_verified } = row.original
        return (
          <input
            key={row.index}
            disabled={!is_verified}
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
    },
    {
      header: '#',
      accessorKey: 'no',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      header: 'Nama',
      accessorKey: 'nama',
    },
    {
      header: 'Perusahaan',
      accessorKey: 'perusahaan',
    },
    {
      accessorKey: 'no_handphone',
      header: 'No.Handphone',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const { email, is_verified } = row.original
        return (
          <>
            <div className="flex gap-1.5 flex-col">
              <p>{email}</p>
              <p className={is_verified ? 'text-primary font-semibold' : 'text-gray-500 italic'}>
                {is_verified ? 'Sudah Verifikasi' : 'Belum Verifikasi'}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'tanggal_mendaftar',
      header: 'Tanggal Mendaftar',
    },
    {
      accessorKey: 'alasan_revisi',
      header: 'Alasan Revisi',
    },
    {
      accessorKey: 'action',
      header: 'Periksa Data',
      cell: ({ row }) => {
        const { id_mitra_kerja } = row.original

        return (
          <>
            <Link to={`partnership/${id_mitra_kerja}`}>
              <Button
                variant={'outline'}
                className={'text-primary border-primary hover:text-primary'}
              >
                Periksa Data
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <ButtonDeletePartnership data={row.original} />
          </>
        )
      },
    },
  ]

  return columns
}

export const ColumnsRejectPartnership = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IPartnershipRegistered>[] = [
    {
      id: 'selected',
      header: ({ table }) => {
        const verifiedRows = table.getRowModel().rows.filter((row) => row.original.is_verified)
        const allVerifiedSelected =
          verifiedRows.length > 0 && verifiedRows.every((row) => row.getIsSelected())
        const handleToggleVerified = (e: React.ChangeEvent<HTMLInputElement>) => {
          const checked = e.target.checked
          verifiedRows.forEach((row) => {
            row.toggleSelected(checked)
          })
        }
        return (
          <input type="checkbox" checked={allVerifiedSelected} onChange={handleToggleVerified} />
        )
      },

      cell: ({ row }) => {
        const { is_verified } = row.original
        return (
          <input
            key={row.index}
            disabled={!is_verified}
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
    },
    {
      header: '#',
      accessorKey: 'no',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      header: 'Nama',
      accessorKey: 'nama',
    },
    {
      header: 'Perusahaan',
      accessorKey: 'perusahaan',
    },
    {
      accessorKey: 'no_handphone',
      header: 'No.Handphone',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const { email, is_verified } = row.original
        return (
          <>
            <div className="flex gap-1.5 flex-col">
              <p>{email}</p>
              <p className={is_verified ? 'text-primary font-semibold' : 'text-gray-500 italic'}>
                {is_verified ? 'Sudah Verifikasi' : 'Belum Verifikasi'}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'tanggal_mendaftar',
      header: 'Tanggal Mendaftar',
    },
    {
      accessorKey: 'alasan_ditolak',
      header: 'Alasan Ditolak',
    },
    {
      accessorKey: 'action',
      header: 'Periksa Data',
      cell: ({ row }) => {
        const { id_mitra_kerja } = row.original

        return (
          <>
            <Link to={`partnership/${id_mitra_kerja}`}>
              <Button
                variant={'outline'}
                className={'text-primary border-primary hover:text-primary'}
              >
                Periksa Data
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <ButtonDeletePartnership data={row.original} />
          </>
        )
      },
    },
  ]

  return columns
}

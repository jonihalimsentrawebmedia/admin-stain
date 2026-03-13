import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IShortJobSeeker } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/data/types.tsx'
import { GetCharacterFirst } from '@/utils/helper.tsx'
import { HiPencil } from 'react-icons/hi'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'
import { ButtonDeleteJobSeeker } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/component/buttonDelete.tsx'
import { SwitchStatus } from '@/pages/modules/pusat-karir/component/common/switchStatus.tsx'

export const ColumnsJobsSeekers = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('page') ?? '10')

  const columns: ColumnDef<IShortJobSeeker>[] = [
    {
      header: '#',
      accessorKey: 'no',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      header: 'Nama',
      accessorKey: 'nama_lengkap',
      cell: ({ row }) => {
        const { nama_lengkap, url_profile } = row.original
        return (
          <>
            <div className="flex items-center gap-1.5">
              {url_profile ? (
                <img src={url_profile} alt="gambar" className="size-10 object-cover rounded-full" />
              ) : (
                <div
                  className={
                    'rounded-full bg-gray-200 text-sm shadow size-10 flex items-center justify-center'
                  }
                >
                  {GetCharacterFirst(nama_lengkap)}
                </div>
              )}

              {nama_lengkap}
            </div>
          </>
        )
      },
    },
    {
      header: 'TTL',
      accessorKey: 'tempat_lahir',
      cell: ({ row }) => {
        const { tempat_lahir, tanggal_lahir } = row.original
        return (
          <>
            <div className="flex gap-1.5 flex-col">
              <p>{tempat_lahir}</p>
              <p>{tanggal_lahir ? format(tanggal_lahir, 'dd-MM-yyyy') : ''}</p>
            </div>
          </>
        )
      },
    },
    {
      header: 'Jenis Kelamin',
      accessorKey: 'jenis_kelamin',
    },
    {
      header: 'No.Handphone',
      accessorKey: 'no_handphone',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) => {
        const { email, is_verified } = row.original
        return (
          <>
            <div className="flex gap-1.5 flex-col">
              <p>{email}</p>
              <p className={is_verified ? 'text-primary font-semibold' : 'text-gray-500 italic'}>
                {is_verified ? 'Sudah Verifikasi' : 'Pending'}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const { id_pencari_kerja, status } = row.original
        return (
          <>
            <SwitchStatus
              status={status}
              url={`/pusat-karir/pencari-kerja/${id_pencari_kerja}/toggle-status`}
              name={'jobs-seekers'}
            />
          </>
        )
      },
    },
    {
      header: '',
      accessorKey: 'action',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex items-center gap-2">
              <Link
                to={`pencari-kerja/detail/${row?.original?.id_pencari_kerja}`}
                className={'bg-blue-500 p-1.5 text-white rounded flex'}
              >
                <MdInfo />
              </Link>
              <Link
                to={`pencari-kerja/edit/${row?.original?.id_pencari_kerja}`}
                className={'bg-yellow-500 p-1.5 text-white rounded flex'}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteJobSeeker data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

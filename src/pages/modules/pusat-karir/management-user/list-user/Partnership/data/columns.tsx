import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPartnership } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/data/types.tsx'
import { SwitchStatus } from '@/pages/modules/pusat-karir/component/common/switchStatus.tsx'
import { GetCharacterFirst } from '@/utils/helper.tsx'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeletePartnership } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/component/buttonDelete.tsx'

export const ColumnsPartnership = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('page') ?? '10')

  const columns: ColumnDef<IPartnership>[] = [
    {
      header: '#',
      accessorKey: 'no',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      header: 'Perusahaan',
      accessorKey: 'nama_perusahaan',
      cell: ({ row }) => {
        const { nama_perusahaan, url_gambar } = row.original
        return (
          <>
            <div className="flex items-center gap-1.5">
              {url_gambar ? (
                <img src={url_gambar} alt="gambar" className="size-10 object-cover rounded-full" />
              ) : (
                <div
                  className={
                    'rounded-full bg-gray-200 text-sm shadow size-10 flex items-center justify-center'
                  }
                >
                  {GetCharacterFirst(nama_perusahaan)}
                </div>
              )}

              {nama_perusahaan}
            </div>
          </>
        )
      },
    },
    {
      header: 'Nama Kontak',
      accessorKey: 'nama_kontak',
    },
    {
      header: 'No.Handphone',
      accessorKey: 'no_handphone',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const { status, id_mitra_kerja } = row.original
        return (
          <SwitchStatus
            status={status}
            url={`/pusat-karir/mitra-kerja/${id_mitra_kerja}/toggle-status`}
            name={'partnership'}
          />
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
                to={`mitra-kerja/detail/${row?.original?.id_mitra_kerja}`}
                className={'bg-blue-500 p-1.5 text-white rounded flex'}
              >
                <MdInfo />
              </Link>
              <Link
                to={`mitra-kerja/edit/${row?.original?.id_mitra_kerja}`}
                className={'bg-yellow-500 p-1.5 text-white rounded flex'}
              >
                <HiPencil />
              </Link>
              <ButtonDeletePartnership data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

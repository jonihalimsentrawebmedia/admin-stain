import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IUserManagement } from '@/pages/modules/LPPM/publication-hki/book/book-center/manangement/data/types.ts'
import { Switch } from '@/components/ui/switch.tsx'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteUserManagement } from '@/pages/modules/LPPM/publication-hki/component/butonDelete.tsx'

type Context = 'pusat-buku-dan-media-masa' | 'pusat-plp' | 'pusat-ppjs' | 'pusat-hki'

interface props {
  context: Context
}

export const ColumnsUserManagement = (props: props) => {
  const { context } = props

  const [searchParams] = useSearchParams()
  const limit = Number(searchParams.get('limit') ?? '10')
  const page = Number(searchParams.get('page') ?? '1')

  const columns: ColumnDef<IUserManagement>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p>{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'Foto',
      header: 'Foto',
      cell: ({ row }) => (
        <img
          src={row.original.url_gambar}
          alt="Foto"
          className="w-[144px] h-[192px] object-cover rounded-md"
        />
      ),
    },
    {
      accessorKey: 'Nama',
      header: 'Informaasi',
      cell: ({ row }) => {
        const detail = row?.original
        return (
          <div className={'grid grid-cols-[12rem_1fr] gap-x-3'}>
            <p className="text-gray-500">Nama</p>
            <p>{detail?.nama}</p>
            <p className="text-gray-500">NIP</p>
            <p>{detail?.nip}</p>
            <p className="text-gray-500">NIDN</p>
            <p>{detail?.nidn}</p>
            <p className="text-gray-500">Pangkat</p>
            <p>{detail?.pangkat}</p>
            <p className="text-gray-500">Golongan</p>
            <p>{detail?.golongan}</p>
            <p className="text-gray-500">Jabatan</p>
            <p>{detail?.jabatan}</p>
            <p className="text-gray-500">Email</p>
            <p>{detail?.email}</p>
            <p className="text-gray-500">Publikasi</p>
            <p>{detail?.publikasi.split(',').join(' | ')}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <Switch checked={row.original.status} />
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'aksi',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className={'flex items-center gap-x-2'}>
              <Link
                to={`edit/${row?.original?.id_anggota}`}
                className={'bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded text-white'}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteUserManagement context={context} data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

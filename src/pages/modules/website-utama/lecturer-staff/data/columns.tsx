import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteEmployee from '@/pages/modules/website-utama/lecturer-staff/component/buttonDelete.tsx'

export const ColumnsEmployee = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IEmployee>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar_url',
      header: 'Gambar',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <img src={data?.gambar_url} alt="icon" className={'object-contain size-12 w-12 h-12'} />
        )
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'nik',
      header: 'NIK',
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'golongan',
      header: 'Golongan',
    },
    {
      accessorKey: 'nama_status',
      header: 'Status',
    },
    {
      accessorKey: 'tempat_lahir',
      header: 'TTL',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div>
            {data.tempat_lahir},{' '}
            {data.tanggal_lahir ? format(data?.tanggal_lahir, 'dd-MM-yyyy') : ''}
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Unit Kerja',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div>
            <p>{data?.nama_unit_kerja}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'sumber_data',
      header: 'Sumber Data',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`detail/${data?.id_sdm}`}
              className={'bg-blue-500 tew-white p-1.5 rounded hover:bg-blue-600 text-white'}
            >
              <MdInfo className={'size-4'} />
            </Link>
            <Link
              to={`edit/${data?.id_sdm}`}
              className={'bg-yellow-500 tew-white p-1.5 rounded hover:bg-yellow-600 text-white'}
            >
              <HiPencil className={'size-4'} />
            </Link>
            <ButtonDeleteEmployee data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

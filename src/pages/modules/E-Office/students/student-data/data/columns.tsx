import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStudentData } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteStudentData from '../component/buttonDelete.tsx'

export const ColumnsStudentData = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IStudentData>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nim',
      header: 'NIM',
    },
    {
      accessorKey: 'nama_mahasiswa',
      header: 'Nama Mahasiswa',
    },
    {
      accessorKey: 'nama_jalur_masuk',
      header: 'Jalur Masuk',
    },
    {
      accessorKey: 'nama_prodi',
      header: 'Program Studi',
    },
    {
      accessorKey: 'nama_status_mahasiswa',
      header: 'Status',
    },
    {
      accessorKey: 'metode_input',
      header: 'Sumber Data',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-2'}>
            <Link
              to={`edit/${data.id_mahasiswa}`}
              className={'p-1.5 text-white bg-yellow-500 hover:bg-yellow-600 rounded'}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteStudentData data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

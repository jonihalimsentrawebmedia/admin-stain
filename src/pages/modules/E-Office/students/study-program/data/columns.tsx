import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStudyProgram } from '../data/types.ts'

export const ColumnsStudyProgram = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IStudyProgram>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'kode_prodi',
      header: 'Kode',
    },
    {
      accessorKey: 'id_sumber',
      header: 'ID Sumber',
    },
    {
      accessorKey: 'nama_prodi',
      header: 'Nama Prodi',
    },
    {
      accessorKey: 'nama_jenjang_pendidikan',
      header: 'Jenjang',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>
              {data?.kode_jenjang_pendidikan} - {data?.nama_jenjang_pendidikan}
            </p>
          </>
        )
      },
    },
    {
      accessorKey: 'nama_fakultas',
      header: 'Nama Fakultas',
    },
  ]

  return columns
}

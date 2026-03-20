import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import ButtonDeleteUserProdi from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola/components/ButtonDelete.tsx'
import ButtonEditUserProdi from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola/components/ButtonEdit.tsx'

const ColumnsManagementUnit = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<any>[] = [
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
      header: 'Foto',
      cell: ({ row }) => {
        return (
          <img src={row.original.gambar_url} className="w-[45px] h-[60px] rounded object-cover" />
        )
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
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
          <div className="flex gap-2 items-center">
            <ButtonEditUserProdi data={row.original} />
            <ButtonDeleteUserProdi data={row.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default ColumnsManagementUnit

import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import { IconDetail } from '@/components/common/table/icon.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

const FacultyProdiColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<SatuanOrganisasiList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_parent',
      header: 'Fakultas Asal',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Prodi',
    },
    {
      accessorKey: 'jenjang_pendidikan',
      header: 'Jenjang Pendidikan',
      cell: ({ row }) => {
        return (
          <div>
            {row.original.kode_jenjang} - {row.original.nama_jenjang_pendidikan}
          </div>
        )
      },
    },

    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Link to={`${row.original.id_satuan_organisasi}/tentang`}>
              <IconDetail />
            </Link>
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default FacultyProdiColumns

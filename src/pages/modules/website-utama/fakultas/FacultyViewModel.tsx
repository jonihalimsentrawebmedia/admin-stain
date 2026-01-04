import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { SatuanOrganisasiList } from '../../settings/model'
import { IconDetail } from '@/components/common/table/icon'

const FacultyViewModel = () => {
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
      accessorKey: 'nama',
      header: 'Nama Fakultas',
    },

    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`/modules/website-utama/fakultas/${row.original.id_satuan_organisasi}/tentang`}
            >
              <IconDetail />
            </Link>
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default FacultyViewModel

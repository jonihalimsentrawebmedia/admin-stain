import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import { FaForward } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'

const ColumnsSectorCarrierProspect = () => {
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
            <Link to={`${row.original.id_satuan_organisasi}/detail`}>
              <Button
                variant={'outline'}
                className={'text-primary border-primary hover:text-primary'}
              >
                <FaForward />
                Liha Detail
              </Button>
            </Link>
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default ColumnsSectorCarrierProspect

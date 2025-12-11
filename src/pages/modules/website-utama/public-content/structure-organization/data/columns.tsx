import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGroupOrganization } from '@/pages/modules/website-utama/public-content/structure-organization/data/index.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { ButtonEditStructureOrganization } from '../components/buttonEdit'
import { ButtonDeleteStructureOrganization } from '@/pages/modules/website-utama/public-content/structure-organization/components/buttonDelete.tsx'

export const GroupOrganizationColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IGroupOrganization>[] = [
    {
      accessorKey: 'urutan',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row?.index + 1}</>
      },
    },
    { accessorKey: 'kelompok', header: 'Kelompok' },
    { accessorKey: 'nama_kelompok', header: 'Nama' },
    {
      accessorKey: 'nama_kelompok',
      header: 'Pejabat',
      cell: ({ row }) => {
        return (
          <>
            <Link to={`team/${row.original?.id_kelompok_organisasi}`}>
              <Button
                variant={'outline'}
                className={'border border-primary text-primary hover:text-primary'}
              >
                <FaForward />
                Lihat Pejabat
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className={'flex items-center justify-end gap-2'}>
          <ButtonEditStructureOrganization {...row?.original} />
          <ButtonDeleteStructureOrganization {...row?.original} />
        </div>
      ),
    },
  ]

  return columns
}

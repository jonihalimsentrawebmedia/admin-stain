import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { ButtonEditChiefOfficer } from '@/pages/modules/Pulsikom/about/chief-officer/component/buttonEdit.tsx'
import type { IGroupChief } from '@/pages/modules/Pulsikom/about/chief-officer/data/types.ts'
import { ButtonDeleteChief } from '@/pages/modules/Pulsikom/about/chief-officer/component/buttonDelete.tsx'
import { FaUserFriends } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'

export const ColumnsChiefOfficer = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam?.get('page') ?? '1')
  const limit = Number(searchParam?.get('limit') ?? '10')

  const columns: ColumnDef<IGroupChief>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_kelompok',
      header: 'Nama Kelompok',
    },
    {
      accessorKey: 'id_kelompok_pimpinan',
      header: 'Pejabat',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Link to={`official/${data?.id_kelompok_pimpinan}`}>
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary'}
              >
                <FaUserFriends />
                Lihat Pejabat
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className={'flex items-center gap-1.5'}>
              <ButtonEditChiefOfficer data={data} />
              <ButtonDeleteChief data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

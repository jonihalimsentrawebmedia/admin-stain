import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { IZoneIntegrity } from '../data/types'
import { FaForward } from 'react-icons/fa'
import { ButtonEditZoneIntegrityCategory } from '@/pages/modules/website-fakultas/zone-integrity/component/buttonEdit.tsx'
import { ButtonDeleteZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/component/buttonDelete.tsx'

const ColumnsZoneIntegrity = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IZoneIntegrity>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_kategori',
      header: 'Kategori',
    },
    {
      accessorKey: '',
      header: 'Sub Kategori',
      cell: ({ row }) => (
        <>
          <Link
            to={`detail/${row?.original?.id_zona_integritas_kategori}`}
            className={
              'border-primary border p-1.5 w-fit rounded text-sm text-primary hover:text-primary flex items-center gap-1.5'
            }
          >
            <FaForward />
            Lihat Sub Kategori
          </Link>
        </>
      ),
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className={'flex items-center gap-1.5'}>
              <ButtonEditZoneIntegrityCategory data={data} />
              <ButtonDeleteZoneIntegrity data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export default ColumnsZoneIntegrity

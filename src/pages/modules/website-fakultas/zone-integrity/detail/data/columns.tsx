import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { ISbuZoneIntegrity } from '../data/types'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { HiPencil } from 'react-icons/hi'
import {
  ButtonDeleteSubZoneIntegrity
} from '@/pages/modules/website-fakultas/zone-integrity/detail/component/buttonDelete.tsx'

const ColumnsSubZoneIntegrity = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ISbuZoneIntegrity>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_sub_kategori',
      header: 'Sub Kategori',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => (
        <>
          <RenderHTMLContent content={row?.original?.deskripsi} />
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
              <Link
                to={`edit/${data?.id_zona_integritas_sub_kategori}`}
                className={'bg-yellow-500 text-white p-1.5 flex w-fit rounded hover:bg-yellow-600'}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteSubZoneIntegrity data={data}/>
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export default ColumnsSubZoneIntegrity

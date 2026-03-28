import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IProgramUndergraduate } from '@/pages/modules/website-fakultas/academic/undergraduate-program/program/data/types.ts'
import { FaForward } from 'react-icons/fa'
import { ButtonEditProgram } from '@/pages/modules/website-fakultas/academic/undergraduate-program/program/component/buttonEdit.tsx'

export const ColumnsProgramUndergraduate = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IProgramUndergraduate>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'url_gambar',
      header: 'Logo',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <img
              src={data?.url_gambar}
              alt="asd"
              className={'size-[50px] w-[50px] h-[50px] rounded-full object-cover'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'nama_program',
      header: 'Nama Program',
    },
    {
      accessorKey: 'id_fakultas_international_ungreaduate_program',
      header: 'Detail',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Link
              to={`detail/${data?.id_fakultas_international_ungreaduate_program}`}
              className="text-primary hover:text-primary border-primary border flex items-center gap-1 p-1.5 w-fit rounded"
            >
              <FaForward />
              Lihat Detail
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex items-center gap-1.5'}>
              <ButtonEditProgram data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

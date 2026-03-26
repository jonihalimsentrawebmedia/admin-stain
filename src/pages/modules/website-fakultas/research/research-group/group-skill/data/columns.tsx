import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGroupSkill } from '@/pages/modules/website-fakultas/research/research-group/group-skill/data/types.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteGroupSkill } from '@/pages/modules/website-fakultas/research/research-group/group-skill/component/buttonDelete.tsx'

export const ColumnsGroupSkill = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('page') ?? '10')

  const columns: ColumnDef<IGroupSkill>[] = [
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
        const data = row?.original
        return (
          <img src={data?.url_gambar} alt="gambar" className={'object-cover w-[300px] h-[200px]'} />
        )
      },
    },
    {
      accessorKey: 'nama_kelompok',
      header: 'Nama',
    },
    {
      accessorKey: 'id_kelompok_keahlian',
      header: 'Detail',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link to={`detail/${data?.id_kelompok_keahlian}`}>
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
            >
              <FaForward /> Lihat Detail Program
            </Button>
          </Link>
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
            <div className="flex items-center gap-1.5">
              <Link
                to={`edit/${data?.id_kelompok_keahlian}`}
                className={'p-1.5 bg-yellow-500 hover:bg-yellow-600 hover:text-white text-white'}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteGroupSkill data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

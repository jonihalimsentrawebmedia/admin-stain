import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { IFacilities } from '../data/types'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteFacilities } from '@/pages/modules/website-fakultas/facilities/component/buttonDelete.tsx'

const ColumnsFacilities = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IFacilities>[] = [
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
      header: 'Gambar',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <img
              src={data?.url_gambar}
              alt="gambar"
              className={'h-[150px] w-full object-contain'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Fasilitas',
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
                to={`detail/${data?.id_fasilitas}`}
                className={'bg-blue-500 p-1.5 text-white hover:bg-blue-600 rounded'}
              >
                <MdInfo />
              </Link>

              <Link
                to={`edit/${data?.id_fasilitas}`}
                className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteFacilities data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export default ColumnsFacilities

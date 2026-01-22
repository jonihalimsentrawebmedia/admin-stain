import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICollaborationList } from '@/pages/modules/website-unit/profile/collaboration/data/types.ts'
import { differenceInYears, format } from 'date-fns'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteCollaborationUnit from '../component/buttonDelete'
import { MdInfo } from 'react-icons/md'
import { History } from 'lucide-react'

export const CollaborationColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ICollaborationList>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_unit',
      header: 'Unit',
      cell: ({ row }) => {
        return (
          <div className={'flex flex-col gap-1.5'}>
            <p>{row?.original?.nama_unit}</p>
            <p className={'text-green-500'}>{row?.original?.kelompok}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_mitra',
      header: 'Mitra',
    },
    {
      accessorKey: 'nama_kategori_kerjasama',
      header: 'Kategori',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-1.5">
            <p>{row?.original?.nama_kategori_kerjasama}</p>
            <p className={'text-green-500'}>{row?.original?.nama_sub_kategori_kerjasama}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_jenis_kerjasama',
      header: 'Jenis',
    },
    {
      accessorKey: 'periode',
      header: 'Periode',
      cell: ({ row }) => {
        const start = row?.original?.tanggal_mulai
        const end = row?.original?.tanggal_selesai
        return (
          <div className="flex flex-col gap-1.5">
            <p>
              {start ? format(start, 'dd-MM-yyyy') : ''} s.d {end ? format(end, 'dd-MM-yyyy') : ''}
            </p>
            <p className={'text-green-500'}>{differenceInYears(end, start)} Tahun</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`log/${row.original.id_kerjasama}`}
            className="border border-[#2769CD] px-4 py-2 text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <History className="text-[#2769CD] size-6" />
            Log
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex items-center justify-end gap-2'}>
            <Link to={`detail/${row?.original?.id_kerjasama}`}>
              <button className={'bg-blue-500 p-1.5 text-white hover:bg-blue-600'}>
                <MdInfo />
              </button>
            </Link>
            <Link to={`edit/${row?.original?.id_kerjasama}`}>
              <button className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600'}>
                <HiPencil />
              </button>
            </Link>
            <ButtonDeleteCollaborationUnit data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

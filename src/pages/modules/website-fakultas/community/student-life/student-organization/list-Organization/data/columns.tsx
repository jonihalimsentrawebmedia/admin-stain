import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { IListStudentOrganization } from './types'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteStudentOrganization } from '@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization/component/buttonDelete.tsx'

const ColumStudentOrganization = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IListStudentOrganization>[] = [
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
              alt={data?.url_gambar}
              className={'object-contain h-[150px]'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Organizacion',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center justify-center gap-2'}>
            <Link
              to={`detail/${data?.id_daftar_organisasi_mahasiswa}`}
              className={'text-white bg-blue-600 p-1.5 hover:bg-blue-700 rounded'}
            >
              <MdInfo />
            </Link>
            <Link
              to={`edit/${data?.id_daftar_organisasi_mahasiswa}`}
              className={'text-white bg-yellow-500 p-1.5 hover:bg-yellow-600 rounded'}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteStudentOrganization data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

export default ColumStudentOrganization

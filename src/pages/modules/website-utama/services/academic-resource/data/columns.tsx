import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IAcademicResource } from '@/pages/modules/website-utama/services/academic-resource/data/resolver.tsx'
import { FiExternalLink } from 'react-icons/fi'
import { LuHistory } from 'react-icons/lu'
import ButtonAddAcademicResource from '@/pages/modules/website-utama/services/academic-resource/component/buttonEdit.tsx'
import ButtonDeleteAcademicResource from '@/pages/modules/website-utama/services/academic-resource/component/buttonDelete.tsx'
import { IoLanguage } from 'react-icons/io5'

export const ColumnsAcademicResource = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IAcademicResource>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'icon_url',
      header: 'ICON',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <img src={data?.icon_url} alt="icon" className={'object-contain size-12 w-12 h-12'} />
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'url_layanan',
      header: 'URL',
      cell: ({ row }) => {
        return (
          <Link
            to={row.original.url_layanan}
            target="_blank"
            className="border whitespace-nowrap px-4 py-2 w-fit border-[#2769CD] text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <FiExternalLink className={'size-5'} />
            Buka URL
          </Link>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Link
              to={`log/${data?.id_academic_resources}`}
              className={
                'flex gap-2 whitespace-nowrap items-center border border-primary text-primary px-4 py-2 rounded w-fit'
              }
            >
              <LuHistory className={'size-5'} />
              Lihat Log
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
            <div className="flex items-center justify-end gap-1.5">
              <Link
                to={`language/${row?.original?.id_academic_resources}`}
                className={'bg-[#0E874A] text-white p-1.5 rounded'}
              >
                <IoLanguage />
              </Link>
              <ButtonAddAcademicResource data={data} />
              <ButtonDeleteAcademicResource data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

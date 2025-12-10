import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { AcademicYearList } from './model'
import { FastForward, History } from 'lucide-react'
import ButtonEditAcademicYear from './components/ButtonEditAcademicYear'
import ButtonDeleteAcademicYear from './components/ButtonDeleteAcademicYear'

const CalendarAcademicViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<AcademicYearList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'tahun_akademik',
      header: 'Tahun',
    },
    {
      accessorKey: 'semester',
      header: 'Semester',
    },
    {
      accessorKey: 'nama_tahun_akademik',
      header: 'Nama Tahun Akademik',
    },
    {
      accessorKey: 'detail',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/services/${row.original.id_tahun_akademik}/log`}
            className="border border-primary px-4 py-2 text-primary rounded-lg flex gap-2 items-center"
          >
            <FastForward className="text-primary size-6" />
            Rincian Kegiatan
          </Link>
        )
      },
    },

    {
      accessorKey: 'detail',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/services/${row.original.id_tahun_akademik}/log`}
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
          <div className="flex gap-2 items-center">
            <ButtonEditAcademicYear data={row.original} />
            <ButtonDeleteAcademicYear data={row.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default CalendarAcademicViewModel

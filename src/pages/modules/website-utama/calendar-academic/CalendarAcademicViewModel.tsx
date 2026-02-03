import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { AcademicYearList } from './model'
import { FastForward, History } from 'lucide-react'
import ButtonEditAcademicYear from './components/ButtonEditAcademicYear'
import ButtonDeleteAcademicYear from './components/ButtonDeleteAcademicYear'
import { IoLanguage } from 'react-icons/io5'

const CalendarAcademicViewModel = () => {
  const navigate = useNavigate()
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
      header: 'Detail',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/calendar-academic/${row.original.id_tahun_akademik}`}
            className="border border-primary px-3 py-1.5 w-fit text-primary rounded-lg flex gap-2 items-center"
          >
            <FastForward className=" size-4" />
            Rincian Kegiatan
          </Link>
        )
      },
    },

    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/calendar-academic/${row.original.id_tahun_akademik}/log`}
            className="border border-[#2769CD] px-3 py-1.5 w-fit text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <History className="size-4" />
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
            <Link
              to={`language/${row?.original?.id_tahun_akademik}`}
              className={'bg-primary p-1.5 text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditAcademicYear data={row.original} />
            <ButtonDeleteAcademicYear data={row.original} />
          </div>
        )
      },
    },
  ]

  function goToBackground() {
    navigate('background')
  }
  return { columns, goToBackground }
}

export default CalendarAcademicViewModel

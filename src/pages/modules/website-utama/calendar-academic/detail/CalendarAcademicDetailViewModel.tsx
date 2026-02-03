import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useGetCalendarAcademicDetail from '../controller/useGetCalendarAcademicDetail'
import type { AcademicActivity } from '../model/academicActivity'
import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { History } from 'lucide-react'
import ButtonDeleteActivity from './components/ButtonDeleteActivity'
import ButtonEditActivity from './components/ButtonEditActivity'
import { FaForward } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'

const CalendarAcademicDetailViewModel = () => {
  const { academicYear } = useGetCalendarAcademicDetail()
  const form = useForm()
  const field = [
    {
      name: 'tahun_akademik',
      label: 'Tahun',
    },
    {
      name: 'semester',
      label: 'Semester',
    },
    {
      name: 'nama_tahun_akademik',
      label: 'Nama Tahun Akademik',
    },
  ]
  const columns: ColumnDef<AcademicActivity>[] = [
    {
      accessorKey: 'urutan',
      header: 'Urut',
    },
    {
      accessorKey: 'nama_kegiatan',
      header: 'Nama Utama Kegiatan',
    },
    {
      accessorKey: 'id_tahun_akademik_kegiatan',
      header: 'Daftar Kegiatan',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/calendar-academic/${row.original.id_tahun_akademik}/detail-activity/${row.original.id_tahun_akademik_kegiatan}`}
            className="border border-primary px-3 py-1.5 w-fit text-primary rounded flex gap-2 items-center"
          >
            <FaForward className={'size-4'} />
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
            to={`/modules/website-utama/calendar-academic/${row.original.id_tahun_akademik}/detail-activity/${row.original.id_tahun_akademik_kegiatan}/log`}
            className="border border-[#2769CD] px-3 py-1.5 w-fit text-[#2769CD] rounded flex gap-2 items-center"
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
              to={`language/${row?.original?.id_tahun_akademik_kegiatan}`}
              className={'bg-primary p-1.5 text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditActivity data={row.original} />
            <ButtonDeleteActivity data={row.original} />
          </div>
        )
      },
    },
  ]
  useEffect(() => {
    if (academicYear) {
      form.reset({
        ...academicYear,
      })
    }
  }, [academicYear])
  return {
    form,
    field,
    columns,
  }
}

export default CalendarAcademicDetailViewModel

import { useForm } from 'react-hook-form'
import useGetAcademicYearActivityDetail from '../controller/useGetAcademicYearActivityDetail'
import { useEffect } from 'react'
import type { ActivityDetail } from '../model/academicActivityDetail'
import type { ColumnDef } from '@tanstack/react-table'
import { Link, useParams } from 'react-router-dom'
import { History } from 'lucide-react'
import ButtonEditDetailActivity from './components/ButtonEditDetailActivity'
import ButtonDeleteDetailActivity from './components/ButtonDeleteDetailActivity'
import { IoLanguage } from 'react-icons/io5'

const DetailActivityViewModel = () => {
  const form = useForm()
  const { idAcademicYear, idActivity } = useParams()
  const { activity } = useGetAcademicYearActivityDetail()
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
    {
      name: 'nama_kegiatan',
      label: 'Nama Utama Kegiatan',
    },
  ]
  const columns: ColumnDef<ActivityDetail>[] = [
    {
      accessorKey: '#',
      header: '#',
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>
      },
    },
    {
      accessorKey: 'uraian_kegiatan',
      header: 'Uraian Kegiatan',
    },
    {
      accessorKey: 'tanggal_mulai',
      header: 'Tanggal Kegiatan',
      cell: ({ row }) => {
        const dateStart = row.original.tanggal_mulai
        const dateEnd = row.original.tanggal_selesai
        return (
          <div>
            {dateStart.split('T')[0].split('-').reverse().join('-')} s/d{' '}
            {dateEnd.split('T')[0].split('-').reverse().join('-')}
          </div>
        )
      },
    },
    {
      accessorKey: 'keterangan',
      header: 'Keterangan',
    },

    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/calendar-academic/${idAcademicYear}/detail-activity/${idActivity}/log-detail/${row.original.id_tahun_akademik_uraian_kegiatan}`}
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
              to={`language/${row?.original?.id_tahun_akademik_uraian_kegiatan}`}
              className={'bg-primary p-1.5 text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditDetailActivity data={row.original} />
            <ButtonDeleteDetailActivity data={row.original} />
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    if (activity) {
      form.reset({
        ...activity,
      })
    }
  }, [activity])
  return {
    field,
    activity,
    form,
    columns,
  }
}

export default DetailActivityViewModel

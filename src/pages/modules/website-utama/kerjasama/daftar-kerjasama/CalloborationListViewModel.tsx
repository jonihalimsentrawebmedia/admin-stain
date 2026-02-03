import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { CalloborationList } from './model'
import { History } from 'lucide-react'
import ButtonDeleteCalloborationList from './components/ButtonDeleteCalloborationList'
import { formatDateTime } from '@/utils/date'
import { IoLanguage } from 'react-icons/io5'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'

const CalloborationListViewModel = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<CalloborationList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'kelompok',
      header: 'Unit',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="whitespace-pre-line">
            {values.nama_unit}
            <br />
            <span className="text-primary">{values.kelompok}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_mitra',
      header: 'Mitra',
    },
    {
      accessorKey: 'id_kategori_kerjasama',
      header: 'Kategori',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="whitespace-pre-line">
            {values.nama_kategori_kerjasama}
            <br />
            <span className="text-primary">{values.nama_sub_kategori_kerjasama}</span>
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
        const values = row.original
        const startDate = formatDateTime(values.tanggal_mulai)
        const endDate = formatDateTime(values.tanggal_selesai)
        return (
          <div className="whitespace-pre-line">
            {startDate.date} s/d <br />
            {endDate.date}
            <br />
            <span className="text-primary">{values.periode} Tahun</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_negara',
      header: 'Negara',
    },

    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/kerjasama/daftar-kerjasama/${row.original.id_kerjasama}/log`}
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
              to={`language/${row?.original?.id_kerjasama}`}
              className={'bg-primary text-white rounded p-1.5'}
            >
              <IoLanguage />
            </Link>
            <Link
              className={'bg-blue-500 p-1.5 text-white hover:bg-blue-600 rounded'}
              to={`/modules/website-utama/kerjasama/daftar-kerjasama/${row.original.id_kerjasama}/detail`}
            >
              <MdInfo />
            </Link>
            <Link
              className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600 rounded'}
              to={`/modules/website-utama/kerjasama/daftar-kerjasama/${row.original.id_kerjasama}/edit`}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteCalloborationList data={row.original} />
          </div>
        )
      },
    },
  ]

  function goToAdd() {
    navigate('add')
  }

  return { columns, goToAdd }
}

export default CalloborationListViewModel

import { IconDetail } from '@/components/common/table/icon'
import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { UserHistories } from './model'
import { formatDateTime, formatDateTimeCustom } from '@/utils/date'

const HistoryLoginViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<UserHistories>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama User
    { accessorKey: 'nama_lengkap', header: 'Nama User' },

    // ✅ Level
    {
      accessorKey: 'level_users',
      header: 'Level',
      cell: (row) => {
        const values = row.row.original
        return <div>{values.level_users.join(', ')}</div>
      },
    },

    // ✅ No. Handphone
    { accessorKey: 'telepon', header: 'No. Handphone' },

    // ✅ Aktif Sejak
    {
      accessorKey: 'aktif_sejak',
      header: 'Aktif Sejak',
      cell: (row) => {
        const value = row.row.original.aktif_sejak
        const temp = formatDateTimeCustom(value)
        // Memastikan tampilan tanggal dan waktu dalam dua baris
        return (
          <div className="whitespace-pre-line text-center">
            {temp.date} <br /> {temp.time??"-"}{' '}
          </div>
        )
      }
    },

    // ✅ Login Terakhir
    {
      accessorKey: 'login_terakhir',
      header: 'Login Terakhir',
      cell: (row) => {
        const value = row.row.original.login_terakhir
        const temp = formatDateTime(value)
        // Memastikan tampilan tanggal dan waktu dalam dua baris
        return (
          <div className="whitespace-pre-line text-center">
            {temp.date} <br /> {temp.time==""?"-":temp.time}{' '}
          </div>
        )
      },
    },

    // ✅ Aktivitas (Ikon Panah)
    {
      accessorKey: 'aktivitas',
      header: 'Aktivitas',
      cell: (row) => {
        const values = row.row.original
        // Ikon panah ke kanan, biasanya untuk melihat detail
        return (
          <Link
            to={`/modules/settings/management-users/history/detail/${values.id_user}`}
            onClick={() => console.log('Lihat Aktivitas', values.id_user)}
          >
            {/* Asumsi IconArrowRight adalah komponen yang merepresentasikan ikon panah ke kanan */}
            <IconDetail />
          </Link>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default HistoryLoginViewModel

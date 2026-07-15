import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IDokterJadwal } from '@/pages/modules/SIM-RS/schedule/data/types.ts'
import { Button } from '@/components/ui/button'
import { CalendarClock } from 'lucide-react'

export const ColumnsDokterJadwal = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IDokterJadwal>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'jenis_kelamin',
      header: 'Jenis Kelamin',
      cell: ({ row }) => {
        return <>{row.original.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</>
      },
    },
    {
      accessorKey: 'nama_spesialis',
      header: 'Spesialisasi',
    },
    {
      accessorKey: 'email',
      header: 'Kontak',
      cell: ({ row }) => {
        return (
          <div className="text-sm">
            <p>{row.original.email}</p>
            <p>{row.original.telepon}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'no_sip',
      header: 'No. SIP',
    },
    {
      accessorKey: 'is_status_jadwal',
      header: 'Status Jadwal',
      cell: ({ row }) => {
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.original.is_status_jadwal
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {row.original.is_status_jadwal ? 'Ada Jadwal' : 'Tidak Ada Jadwal'}
          </span>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link to={`${data?.id_dokter}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-[#278374] text-[#278374] hover:text-primary"
            >
              <CalendarClock className="mr-1 h-4 w-4" />
              Kelola Jadwal
            </Button>
          </Link>
        )
      },
    },
  ]

  return columns
}

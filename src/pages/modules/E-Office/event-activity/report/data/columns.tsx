import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IEventReport } from '@/pages/modules/E-Office/event-activity/report/data/types.ts'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'
import { id } from 'date-fns/locale'

export const ColumnsEventReport = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IEventReport>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nama_kegiatan',
      header: 'Informasi Kegiatan',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p className="text-primary font-semibold text-lg">{data?.nama_kegiatan}</p>
            <p>
              {data?.tanggal_kegiatan
                ? format(data?.tanggal_kegiatan, 'EEEE, dd-MM-yyyy', {
                    locale: id,
                  })
                : ''}
            </p>
            <p>{data?.waktu}</p>
            <p>{data?.tempat}</p>
            <p>
              Penyelenggara :{' '}
              <span className={'font-semibold text-primary'}>{data?.penyelenggara}</span>
            </p>
          </>
        )
      },
    },
    {
      accessorKey: 'jumlah_peserta',
      header: 'Jumlah Peserta',
    },
    {
      accessorKey: 'jumlah_file_pendukung',
      header: 'File Pendukung',
    },
    {
      accessorKey: 'jumlah_dokumentasi',
      header: 'Dokumentasi',
    },
    {
      accessorKey: 'jumlah_pengeluaran',
      header: 'Pengeluaran',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p className="text-end">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(data?.jumlah_pengeluaran ?? 0)}
            </p>
          </>
        )
      },
    },
    {
      accessorKey: 'is_laporan_kegiatan',
      header: 'Laporan Kegiatan',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            {data?.is_laporan_kegiatan ? (
              <Link
                to={`/modules/e-office/event-activity/event-data/detail/${data?.id_acara}?tabs=report`}
              >
                <Button
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary rounded-full'}
                >
                  Detail Laporan
                </Button>
              </Link>
            ) : (
              <p className={'text-gray-500'}>Belum Ada</p>
            )}
          </>
        )
      },
    },
  ]

  return columns
}

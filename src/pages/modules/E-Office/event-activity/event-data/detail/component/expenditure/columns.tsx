import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IExpenditureEvent } from './hooks.tsx'
import { format } from 'date-fns'
import { FiExternalLink } from 'react-icons/fi'
import { ButtonEditExpenditure } from './buttonEdit.tsx'
import { ButtonDeleteEventFile } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/expenditure/buttonDelete.tsx'

export const ColumnsExpenditure = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IExpenditureEvent>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'uraian_pengeluaran',
      header: 'Uraian Pengeluaran',
    },
    {
      accessorKey: 'tanggal_pengeluaran',
      header: 'Tanggal Pengeluaran',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>{data?.tanggal_pengeluaran ? format(data?.tanggal_pengeluaran, 'dd-MM-yyyy') : '-'}</>
        )
      },
    },
    {
      accessorKey: 'yang_membayar',
      header: 'yang membayarkan',
    },
    {
      accessorKey: 'tempat_pembelian',
      header: 'Tempat Pembelian',
    },
    {
      accessorKey: 'jumlah_pengeluaran',
      header: 'Jumlah Pembelian',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <p className={'text-end'}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(data?.jumlah_pengeluaran) ?? 0)}
          </p>
        )
      },
    },
    {
      accessorKey: 'url_file_pengeluaran',
      header: 'Bukti Bayar',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            {data?.url_file_pengeluaran ? (
              <Link
                to={data?.url_file_pengeluaran}
                target="_blank"
                className="text-primary border w-fit border-primary flex items-center gap-1.5 p-1.5 rounded text-sm whitespace-nowrap"
              >
                <FiExternalLink className={'size-4 w-4'} />
                Bukti Bayar
              </Link>
            ) : (
              '-'
            )}
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center gap-1.5 justify-center">
              <ButtonEditExpenditure data={data} />
              <ButtonDeleteEventFile data={data} />
            </div>
          </>
        )
      },
    },
  ]
  return columns
}

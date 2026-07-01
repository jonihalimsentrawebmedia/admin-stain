import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IEreceipt } from '@/pages/modules/E-Office/E-Receipt/data/types.ts'
import ButtonEditEreceipt from '@/pages/modules/E-Office/E-Receipt/component/buttonEdit.tsx'
import ButtonDeleteEreceipt from '@/pages/modules/E-Office/E-Receipt/component/buttonDelete.tsx'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'

export const ColumnsEreceipt = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IEreceipt>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'no_kwitansi',
      header: 'Info Kwitansi',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="grid grid-cols-[8rem_1fr] gap-2">
              <p>Status</p>
              <p className={'font-semibold'}></p>
              <p>No Kwitansi</p>
              <p className={'font-semibold'}>{data?.no_kwitansi}</p>
              <p>Tanggal Dibuat</p>
              <p className={'font-semibold'}>{format(data?.created_at, 'dd/MM/yyyy, HH:mm')}</p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'jumlah',
      header: () => <div className={'text-end'}>Jumlah</div>,
      cell: ({ row }) => {
        const data = row?.original
        return (
          <p className={'text-end'}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(Number(data?.jumlah))}
          </p>
        )
      },
    },
    {
      accessorKey: 'faktur',
      header: 'Faktur',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Link to={`invoice/${data?.id_kwitansi}`}>
              <Button className={'text-white'}>Lihat Faktur</Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'nomor_serial',
      header: 'Serial Number',
    },
    {
      accessorKey: 'nama_penerima',
      header: 'Penerima',
    },
    {
      accessorKey: 'nama_penyetor',
      header: 'Penyetor',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className="flex items-center justify-center gap-1.5">
            <ButtonEditEreceipt data={data} />
            <ButtonDeleteEreceipt data={data} />
          </div>
        )
      },
    },
  ]
  return columns
}

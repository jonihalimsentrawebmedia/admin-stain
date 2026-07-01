import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ItemInvoice } from '@/pages/modules/E-Office/E-Receipt/invoice/data/types.ts'
import ButtonEditItemFaktur from '@/pages/modules/E-Office/E-Receipt/invoice/component/buttonEdit.tsx'
import ButtonDeleteItemFaktur from '@/pages/modules/E-Office/E-Receipt/invoice/component/buttonDelete.tsx'

export const ColumnsItemFaktur = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ItemInvoice>[] = [
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
      accessorKey: 'nama_barang',
      header: 'Nama Barang',
    },
    {
      accessorKey: 'banyak',
      header: 'Banyak',
      cell: ({ row }) => {
        const data = row?.original
        return <p className={'text-end'}>{data?.banyak}</p>
      },
    },
    {
      accessorKey: 'satuan',
      header: 'Satuan',
    },
    {
      accessorKey: 'harga_satuan',
      header: () => <div className={'text-end'}>Harga Satuan</div>,
      cell: ({ row }) => {
        const data = row?.original
        return (
          <p className={'text-end'}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(Number(data?.harga_satuan))}
          </p>
        )
      },
    },
    {
      accessorKey: 'total_harga',
      header: () => <div className={'text-end'}>Total Harga</div>,
      cell: ({ row }) => {
        const data = row?.original
        return (
          <p className={'text-end'}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(Number(data?.total_harga))}
          </p>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className="flex items-center justify-center gap-1.5">
            <ButtonEditItemFaktur data={data} />
            <ButtonDeleteItemFaktur data={data} />
          </div>
        )
      },
    },
  ]
  return columns
}

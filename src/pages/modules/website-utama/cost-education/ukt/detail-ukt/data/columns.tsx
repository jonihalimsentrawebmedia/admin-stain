import type { ColumnDef } from '@tanstack/react-table'
import type { LevelCost } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/data/types.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { TSchemaUtkProdiEntrance } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/data/resolver.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'

export const ProdiUktColumns: ColumnDef<LevelCost>[] = [
  {
    accessorKey: '#',
    header: '#',
    cell: ({ row }) => {
      const i = row?.index
      return <>{i + 1}</>
    },
  },
  {
    accessorKey: 'nama_tingkatan',
    header: 'Nama Tingkatan',
  },
  {
    accessorKey: 'jumlah_bawaan',
    header: () => {
      return <div className={'text-end'}>Jumlah Bawaan UKT</div>
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className={'text-end'}>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }).format(Number(data?.biaya))}
        </div>
      )
    },
  },
]

interface props {
  form: UseFormReturn<TSchemaUtkProdiEntrance>
}

export const ColumnsUktDetail = (props: props) => {
  const { form } = props
  const columns: ColumnDef<LevelCost>[] = [
    {
      accessorKey: '#',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'nama_tingkatan',
      header: 'Nama Tingkatan',
    },
    {
      accessorKey: 'jumlah_bawaan',
      header: () => {
        return <div className={'text-end'}>Jumlah Bawaan UKT</div>
      },
      cell: ({ row }) => {
        return (
          <CurrencyInput
            className={'w-full text-end flex! flex-row! justify-end!'}
            inputClassName={'text-end max-w-[250px]'}
            form={form}
            name={`biaya_tingkatan.${row?.index}.biaya`}
            placeholder={'Biaya'}
          />
        )
      },
    },
  ]
  return columns
}

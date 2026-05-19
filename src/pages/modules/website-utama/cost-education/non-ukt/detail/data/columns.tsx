import type { ColumnDef } from '@tanstack/react-table'
import type { BiayaNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/data/types.tsx'
import { Label } from '@/components/ui/label.tsx'
import { FormUpdateCostTariff } from '@/pages/modules/website-utama/cost-education/non-ukt/detail/data/form.tsx'

export const ColumnsUtkTariffType = () => {
  const columns: ColumnDef<BiayaNonUkt>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      id: 'selected',
      header: ({ table }) => {
        return (
          <Label className={'flex items-center gap-1.5'}>
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
            Aktifkan
          </Label>
        )
      },
      cell: ({ row }) => {
        const { id_jenis_tarif } = row.original
        return (
          <div className={'flex items-center gap-1.5'}>
            <input
              key={row.index}
              disabled={!id_jenis_tarif}
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
            {row?.getIsSelected() ? 'Ya' : 'Tidak'}
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_jenis_tarif',
      header: 'Nama Tarif',
    },
    {
      accessorKey: 'biaya',
      header: () => {
        return <p className={'text-end'}>Jumlah Tarif</p>
      },
      cell: ({ row }) => {
        const data = row.original
        const status = row?.getIsSelected()
        return (
          <>
            <FormUpdateCostTariff data={data} status={status} />
          </>
        )
      },
    },
  ]

  return columns
}

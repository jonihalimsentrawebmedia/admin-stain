import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ILevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/data/types.ts'
import { ButtonDeleteLevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/component/buttonDelete.tsx'
import { ButtonEditLevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/component/buttonEdit.tsx'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'

interface props {
  DataSelect?: EducationalLevelList[]
}

export const columnsLevelUkt = (props: props) => {
  const { DataSelect } = props
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ILevelUkt>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'id_tingkatan_ukt',
      header: 'Jenjang',
      cell: ({ row }) => {
        const data = row.original
        return (
          <p>
            {data?.kode_jenjang_pendidikan} - {data?.nama_jenjang_pendidikan}
          </p>
        )
      },
    },
    {
      accessorKey: 'nama_tingkatan_ukt',
      header: 'Nama Tingkatan',
    },
    {
      accessorKey: 'jumlah_bawaan_ukt',
      header: () => {
        return <div className={'text-end'}>Jumlah Bawaan UKT</div>
      },
      cell: ({ row }) => {
        return (
          <div className={'text-end'}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(row.original.jumlah_bawaan_ukt)}
          </div>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className={'flex gap-2 items-center justify-end'}>
            <ButtonEditLevelUkt data={data} select={DataSelect} />
            <ButtonDeleteLevelUkt data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

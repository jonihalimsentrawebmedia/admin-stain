import type { ColumnDef } from '@tanstack/react-table'
import type { TariffTypeList } from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/data/type.ts'
import { useSearchParams } from 'react-router-dom'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import { ButtonEditTariffType } from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/component/buttonEdit.tsx'
import { ButtonDeleteTariffType } from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/component/buttonDelete.tsx'

interface props {
  selectList: EducationalLevelList[]
}

export const ColumnsTariffType = (props: props) => {
  const { selectList } = props
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<TariffTypeList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'Jenjang',
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
      accessorKey: 'nama_jenis_tarif',
      header: 'Nama Tarif',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex gap-2 items-center justify-end'}>
            <ButtonEditTariffType select={selectList} data={row.original} />
            <ButtonDeleteTariffType data={row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

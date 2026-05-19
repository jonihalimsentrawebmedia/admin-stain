import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { Check } from 'lucide-react'
import { BiX } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import type { NonUktEntranceList } from './types.tsx'
import { ButtonEditEntranceNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/component/buttonEdit.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import type { INonUktEntrance } from '@/pages/modules/website-utama/cost-education/non-ukt/entrance-list/data/types.ts'
import { ButtonDeleteEntranceNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/component/buttonDelete.tsx'

interface props {
  faculty: SatuanOrganisasiList[]
  prodi: SatuanOrganisasiList[]
  jenjang: EducationalLevelList[]
  entrance: INonUktEntrance[]
}

export const ColumnsEducationNonUkt = (props: props) => {
  const { faculty, prodi, jenjang, entrance } = props
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<NonUktEntranceList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_prodi',
      header: 'Prodi',
    },
    {
      accessorKey: 'nama_fakultas',
      header: ' Fakultas',
    },
    {
      accessorKey: 'nama_jenjang',
      header: 'Jenjang',
      cell: ({ row }) => {
        const data = row.original
        return <p>{data?.nama_jenjang}</p>
      },
    },
    {
      accessorKey: 'nama_jalur_masuk',
      header: 'Jalur Masuk',
    },
    {
      accessorKey: 'publish',
      header: 'Publish',
      cell: ({ row }) => {
        const data = row.original
        return (
          <p className={'flex gap-1 items-center'}>
            {data?.publish ? (
              <Check className={'size-4 text-green-500'} />
            ) : (
              <BiX className={'size-4 text-red-500'} />
            )}
            {data?.publish ? 'Ya' : 'Tidak'}
          </p>
        )
      },
    },
    {
      accessorKey: 'tarif',
      header: 'tarif',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link to={`${data?.id_non_ukt_jalur_masuk}`}>
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
            >
              Jumlah Tarif Bawaan
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-end gap-1.5">
              <ButtonEditEntranceNonUkt
                data={data}
                faculty={faculty}
                prodi={prodi}
                jenjang={jenjang}
                entrance={entrance}
              />
              <ButtonDeleteEntranceNonUkt data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

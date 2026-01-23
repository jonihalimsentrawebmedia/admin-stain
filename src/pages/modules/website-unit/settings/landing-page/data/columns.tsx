import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { TogglePosition } from '../components/togglePosition'
import { ButtonEditLandingUnit } from '../components/buttonEdit.tsx'
import { ButtonDeleteLandingUnit } from '../components/buttonDelete.tsx'
import type { IUnitLandingPage } from '../data/types.tsx'

export const UnitLandingPageColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUnitLandingPage>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar_key',
      header: 'Thumbnail',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <img
              src={data?.gambar_url}
              alt="gambar"
              className={'w-[300px] h-[150px] object-cover'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'is_status',
      header: 'Status Aktif',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <TogglePosition name={'is_status'} data={data} />
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
          <div className={'flex items-center gap-2 flex-col'}>
            <ButtonEditLandingUnit data={data} />
            <ButtonDeleteLandingUnit data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

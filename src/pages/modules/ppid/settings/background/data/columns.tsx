import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBackgroundPPID } from './types'
import { ToggleStatus } from '../component/buttonToggle.tsx'
import { ButtonEditBackgroundUnit } from '../component/buttonEdit'
import { ButtonDeleteBackgroundUnit } from '../component/buttonDelete.tsx'

export const ColumnsBackground = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IBackgroundPPID>[] = [
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row?.original
        return <ToggleStatus data={data} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-2 flex-col'}>
            <ButtonEditBackgroundUnit data={data} />
            <ButtonDeleteBackgroundUnit data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

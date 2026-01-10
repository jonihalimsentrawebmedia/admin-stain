import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { ToggleStatus } from '@/pages/modules/website-prodi/settings/background/components/buttonToggle.tsx'
import type { IProdiBackground } from '@/pages/modules/website-prodi/settings/background/data/index.ts'
import { ButtonEditBackgroundProdi } from '@/pages/modules/website-prodi/settings/background/components/buttonEdit.tsx'
import { ButtonDeleteBackgroundProdi } from '@/pages/modules/website-prodi/settings/background/components/buttonDelete.tsx'

export const ProdiLandingPageColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IProdiBackground>[] = [
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
            <ButtonEditBackgroundProdi data={data} />
            <ButtonDeleteBackgroundProdi data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IProdiLandingPage } from '@/pages/modules/website-prodi/settings/landing-page/data/types.tsx'
import { TogglePosition } from '@/pages/modules/website-prodi/settings/landing-page/components/togglePosition.tsx'
import { ButtonEditLandingProdi } from '@/pages/modules/website-prodi/settings/landing-page/components/buttonEdit.tsx'
import { ButtonDeleteLandingProdi } from '@/pages/modules/website-prodi/settings/landing-page/components/buttonDelete.tsx'

export const ProdiLandingPageColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IProdiLandingPage>[] = [
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
      accessorKey: 'is_atas',
      header: 'Posisi Atas',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <TogglePosition name={'is_atas'} data={data} />
          </>
        )
      },
    },
    {
      accessorKey: 'is_bawah',
      header: 'Posisi Bawah',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <TogglePosition name={'is_bawah'} data={data} />
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
            <ButtonEditLandingProdi data={data} />
            <ButtonDeleteLandingProdi data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

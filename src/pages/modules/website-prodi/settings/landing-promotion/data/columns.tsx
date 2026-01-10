import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ILandingPromotion } from '../data/index'
import { TogglePosition } from '../components/buttonToggle'
import { ButtonEditPromotionLanding } from '../components/buttonEdit'
import { ButtonDeleteLandingPromotion } from '../components/buttonDelete'

export const ProdiLandingPromotionColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ILandingPromotion>[] = [
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
      accessorKey: 'is_tengah',
      header: 'Posisi Tengah',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <TogglePosition name={'is_tengah'} data={data} />
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
      accessorKey: 'is_sisi_kiri',
      header: 'Posisi Sisi Kiri',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <TogglePosition name={'is_sisi_kiri'} data={data} />
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
            <ButtonEditPromotionLanding data={data} />
            <ButtonDeleteLandingPromotion data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IProgramUndergraduatePartner } from './types'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { ButtonEditPartner } from '../component/buttonEdit.tsx'
import { ButtonDeletePartner } from '../component/buttonDelete.tsx'

export const ColumnsPartnerUndergraduate = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IProgramUndergraduatePartner>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'url_gambar',
      header: 'Logo',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <img
              src={data?.url_gambar}
              alt="asd"
              className={'size-[50px] w-[50px] h-[50px] rounded-full object-cover'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'nama_universitas',
      header: 'Nama Universitas',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => {
        const data = row.original
        return <RenderHTMLContent content={data?.deskripsi ?? ''} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex flex-col items-center gap-1.5'}>
              <ButtonEditPartner data={data} />
              <ButtonDeletePartner data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

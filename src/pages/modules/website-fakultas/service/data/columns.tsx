import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IServices } from '../data/types'
import { Button } from '@/components/ui/button.tsx'
import { BiLinkExternal } from 'react-icons/bi'
import { Switch } from '@/components/ui/switch.tsx'
import { ButtonEditService } from '@/pages/modules/website-fakultas/service/component/buttonEdit.tsx'
import { ButtonDeleteService } from '@/pages/modules/website-fakultas/service/component/buttonDelete.tsx'

export const ColumnsService = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IServices>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_layanan',
      header: 'Nama Layanan',
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <Link to={data?.url} target={'_blank'}>
            <Button
              variant={'outline'}
              className={'border-blue-500 text-blue-500 hover:text-blue-500'}
            >
              <BiLinkExternal />
              Buka URL
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'is_footer',
      header: 'Posisi Bawah Slider',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Switch checked={data?.is_footer} />
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
          <>
            <div className={'flex items-center gap-1.5'}>
              <ButtonEditService data={data} />
              <ButtonDeleteService data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

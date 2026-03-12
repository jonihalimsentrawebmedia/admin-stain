import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IServiceFooter } from '@/pages/modules/pusat-karir/service/Footer/data/types.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { ButtonEditFooterService } from '@/pages/modules/pusat-karir/service/Footer/component/buttonEdit.tsx'
import { ButtonDeleteFooterService } from '@/pages/modules/pusat-karir/service/Footer/component/buttonDelete.tsx'

export const ColumnsService = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('page') ?? '10')

  const columns: ColumnDef<IServiceFooter>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
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
        return (
          <Link
            to={row?.original?.url ?? '#'}
            target={'_blank'}
            className={
              'border border-blue-500 p-1.5 rounded-md text-blue-500 flex w-fit item-center gap-1.5'
            }
          >
            <FaExternalLinkAlt className={'size-4'} />
            Buka URL
          </Link>
        )
      },
    },
    {
      accessorKey: 'is_active',
      header: 'Posisi Footer',
      cell: ({ row }) => <Switch checked={row?.original?.is_footer} />,
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className={'flex items-center gap-1.5'}>
          <ButtonEditFooterService data={row?.original} />
          <ButtonDeleteFooterService data={row?.original} />
        </div>
      ),
    },
  ]

  return columns
}

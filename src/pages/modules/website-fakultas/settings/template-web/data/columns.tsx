import type { ColumnDef } from '@tanstack/react-table'
import type { IThemeUnit } from './types.ts'
import { format } from 'date-fns'
import { ButtonStatus } from '../component/buttonStatus.tsx'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { FaGear } from 'react-icons/fa6'
import ButtonEditDescription from '@/pages/modules/website-fakultas/settings/template-web/component/buttonEdit.tsx'

export const ColumnsTemplateWebsite = () => {
  const columns: ColumnDef<IThemeUnit>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'thema',
      header: 'Nama Template',
    },
    {
      accessorKey: 'active',
      header: 'Status Active',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div>
            <ButtonStatus {...(data as IThemeUnit)} />
          </div>
        )
      },
    },
    {
      accessorKey: 'tanggal_aktif',
      header: 'Tanggal Aktif',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <p>{data?.tanggal_aktif ? format(data?.tanggal_aktif, 'dd MMMM yyyy, HH:mm:ss') : '-'}</p>
        )
      },
    },
    {
      accessorKey: 'keterangan',
      header: 'Keterangan',
      cell: ({ row }) => {
        const data = row?.original
        return <ButtonEditDescription data={data} />
      },
    },
    {
      accessorKey: 'id_template',
      header: 'Pengaturan Warna',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Link to={`${data?.thema}`}>
              <Button
                variant={'outline'}
                className={'border-primary hover:text-primary text-primary'}
              >
                <FaGear />
                Atur Warna
              </Button>
            </Link>
            <p>Warna :{data?.default === 'DEFAULT' ? 'Default' : 'Custom'}</p>
          </>
        )
      },
    },
  ]

  return columns
}

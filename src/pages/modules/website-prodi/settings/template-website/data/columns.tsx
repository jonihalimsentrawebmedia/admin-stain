import type { ColumnDef } from '@tanstack/react-table'
import type { IThemeProdi } from '@/pages/modules/website-prodi/settings/template-website/data/types.ts'
import { format } from 'date-fns'
import { ButtonStatus } from '@/pages/modules/website-prodi/settings/template-website/component/buttonStatus.tsx'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { FaGear } from 'react-icons/fa6'
import ButtonEditDescription from '../component/buttonEdit.tsx'

export const ColumnsTemplateWebsite = () => {
  const columns: ColumnDef<IThemeProdi>[] = [
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
      accessorKey: 'is_tersedia',
      header: 'Status Tersedia',
      cell: ({ row }) => {
        const data = row?.original
        return <p>{data?.is_tersedia ? 'Tersedia' : 'Tidak Tersedia'}</p>
      },
    },
    {
      accessorKey: 'active',
      header: 'Status Active',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div>
            <ButtonStatus {...(data as IThemeProdi)} />
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

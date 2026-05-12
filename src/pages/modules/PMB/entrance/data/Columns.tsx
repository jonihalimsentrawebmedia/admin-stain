import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IEntrance } from '@/pages/modules/PMB/entrance/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { FiExternalLink } from 'react-icons/fi'
import { FaForward } from 'react-icons/fa'
import { SwitchStatus } from '@/pages/modules/PMB/entrance/component/switchStatus.tsx'
import ButtonEditEntrancePMB from '@/pages/modules/PMB/entrance/component/buttonEdit.tsx'
import ButtonDeleteEntrancePMB from '@/pages/modules/PMB/entrance/component/buttonDelete.tsx'

export const ColumnsEntrance = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IEntrance>[] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_jalur',
      header: 'Nama Jalur',
    },
    {
      accessorKey: 'url_pendaftaran',
      header: 'URL Pendaftaran',
      cell: ({ row }) => {
        return (
          <Link
            to={row.original.url_pendaftaran}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
            >
              <FiExternalLink />
              Buka URL
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'id_jalur_masuk',
      header: 'Konten',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Link to={`content/${data.id_jalur_masuk}`}>
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary'}
              >
                <FaForward />
                Lihat Konten
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'is_status_tampil',
      header: 'Status Tampil',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <SwitchStatus data={data} />
          </>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-end gap-2">
              <ButtonEditEntrancePMB data={data} />
              <ButtonDeleteEntrancePMB data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

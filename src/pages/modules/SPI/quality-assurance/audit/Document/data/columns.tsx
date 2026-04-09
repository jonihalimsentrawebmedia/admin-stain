import type { ColumnDef } from '@tanstack/react-table'

import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { type IDocumentAudit } from '../data/types.ts'
import { ButtonDeleteDocumentAudit } from '@/pages/modules/SPI/quality-assurance/audit/Document/component/buttonDelete.tsx'

export const ColumnsAuditDocument = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IDocumentAudit>[] = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_dokumen',
      header: 'Nama Berkas',
    },
    {
      accessorKey: 'link_drive',
      header: 'Link',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div>
              {data?.is_google_link ? (
                <Link to={data?.link_google ?? '#'} target={'_blank'}>
                  <Button>Buka File</Button>
                </Link>
              ) : (
                <Link to={data?.url_dokumen ?? '#'} target={'_blank'}>
                  <Button>Buka File</Button>
                </Link>
              )}
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'jumlah_diunduh',
      header: 'Diunduh',
    },
    {
      accessorKey: 'id_download',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-1.5'}>
            <Link to={`edit/${data?.id_dokumen}`} className="flex items-center gap-2">
              <button className={'bg-yellow-500 p-1.5 rounded hover:bg-yellow-600 text-white'}>
                <HiPencil />
              </button>
            </Link>
            <ButtonDeleteDocumentAudit data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

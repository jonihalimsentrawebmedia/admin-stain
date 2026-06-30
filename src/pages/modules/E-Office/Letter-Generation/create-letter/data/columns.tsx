import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo } from 'react-icons/md'

export const ColumnsCreateLetterByType = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IMailTypeLetter>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'kode_surat',
      header: 'Kode Surat',
    },
    {
      accessorKey: 'nama_jenis_surat',
      header: 'Nama Jenis Surat',
    },
    {
      accessorKey: 'kategori_jenis_surat',
      header: 'Kategori Jenis Surat',
    },
    {
      accessorKey: 'action',
      header: 'Aksi',
      cell: ({ row }) => {
        const data = row.original
        return (
          <Link
            to={`create/${data?.id_mail_jenis_surat}`}
            className={'flex items-center justify-center'}
          >
            <Button className={'text-white'}>
              <MdInfo className={'size-4'} />
              Detail Jenis Surat ({data?.jumlah_template})
            </Button>
          </Link>
        )
      },
    },
  ]
  return columns
}

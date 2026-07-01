import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/types.ts'
import { Button } from '@/components/ui/button.tsx'

const ColumnsCreateLetter = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ITypeTemplateLetter>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nama_jenis_template',
      header: 'Nama Jenis Surat',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex gap-1.5 items-center justify-center">
              {data?.is_existing_template ? (
                <Link to={`${data.kode_template}`}>
                  <Button className={'text-white'}>Buat Surat</Button>
                </Link>
              ) : (
                <Button className={'text-white bg-blue-500 hover:bg-blue-600'}>Coming soon</Button>
              )}
            </div>
          </>
        )
      },
    },
  ]

  return { columns }
}

export default ColumnsCreateLetter

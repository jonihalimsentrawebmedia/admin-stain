import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/types.ts'
import ButtonEditLetterType from '@/pages/modules/E-Office/Letter-Generation/Letter-type/component/buttonDelete.tsx'

export const LetterTypeCode = () => {
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
      accessorKey: 'nama_jenis_surat',
      header: 'Nama Jenis Surat',
    },
    {
      accessorKey: 'nama_kategori_jenis_surat',
      header: 'Kategori Jenis Surat',
    },
    {
      accessorKey: 'kode_surat',
      header: 'Kode Surat',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className={'flex items-center gap-2 justify-center'}>
              <ButtonEditLetterType data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return { columns }
}

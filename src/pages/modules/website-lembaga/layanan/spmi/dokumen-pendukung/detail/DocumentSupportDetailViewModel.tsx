import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import type { DocumentSupportList } from '../model'
import { Button } from '@/components/ui/button'
import ButtonEdit from './components/ButtonEdit'
import ButtonDelete from './components/ButtonDelete'

const DocumentSupportDetailViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<DocumentSupportList>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Pangkat Golongan
    { accessorKey: 'nama_dokumen', header: 'Nama Dokumen' },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: () => {
        return (
          <div className="flex gap-2 items-center">
            <Button variant={'outline'} className="border-primary text-primary hover:text-primary">
              URL
            </Button>
          </div>
        )
      },
    },
    { accessorKey: 'public', header: 'Public / Tidak' },
    { accessorKey: 'urutan', header: 'Urutan' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEdit data={values} />
            <ButtonDelete data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default DocumentSupportDetailViewModel

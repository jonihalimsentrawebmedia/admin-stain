import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import type { DocumentItem } from '../model'
import { Button } from '@/components/ui/button'
import ButtonEditDocument from '../../components/button/ButtonEditDocument'
import ButtonDeleteDocument from '../../components/button/ButtonDeleteDocument'

const InfomarmationAvailableDetailViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<DocumentItem>[] = [
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
      header: 'Buka Dokumen',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="flex gap-2 items-center">
            {values.jenis.toLocaleLowerCase() == 'dokumen' ? (
              <Button
                variant={'outline'}
                className="border-primary text-primary hover:text-primary"
                onClick={() => window.open(values.url_file, '_blank')}
              >
                Buka Dokumen
              </Button>
            ) : (
              <Button
                variant={'outline'}
                className="border-primary text-primary hover:text-primary"
                onClick={() => window.open(values.url ?? '', '_blank')}
              >
                URL
              </Button>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'public',
      header: 'Public / Tidak',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            {row.original.public ? 'Public' : 'Tidak Public'}
          </div>
        )
      },
    },
    { accessorKey: 'urutan', header: 'Urutan' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditDocument
              title="Dokumen"
              titleField={searchParams.get('title') || ''}
              idCategory={values.id_kategori}
              idName="id_kategori"
              keyLinkPost="information-available-ppip-document"
              linkPost={`/unit-ppid/informasi-tersedia-dokumen/${values.id_daftar_dokumen}`}
              data={values}
            />
            <ButtonDeleteDocument
              titleField={searchParams.get('title') || ''}
              title="Dokumen"
              keyLinkDelete="information-available-ppip-document"
              linkDelete={`/unit-ppid/informasi-tersedia-dokumen/${values.id_daftar_dokumen}`}
              data={values}
            />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default InfomarmationAvailableDetailViewModel

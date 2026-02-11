import type { ColumnDef } from '@tanstack/react-table'

import { Link, useSearchParams } from 'react-router-dom'
import type { DocumentSupportList } from './model'
import { Button } from '@/components/ui/button'
import ButtonEdit from './components/ButtonEdit'
import ButtonDelete from './components/ButtonDelete'
import ButtonAddDocument from './components/ButtonAddDocument'

const TemplateAimViewModel = () => {
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
    { accessorKey: 'nama_dokumen', header: 'Judul Dokumen Pendukung Akreditasi' },
    {
      accessorKey: 'slug',
      header: 'Dokumen',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`/modules/website-lembaga/layanan/spmi/dokumen-pendukung/${row.original.id_lembaga_daftar_dokumen}`}
            >
              <Button
                variant={'outline'}
                className="border-[#2769CD] text-[#2769CD] hover:text-[#2769CD]"
              >
                Lihat Daftar Dokumen ({row.original.jumlah_dokumen_pendukung_akreditasi})
              </Button>
            </Link>
            <ButtonAddDocument />
          </div>
        )
      },
    },

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

export default TemplateAimViewModel

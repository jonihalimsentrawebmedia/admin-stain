import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ButtonEditInformationPublic from '../components/button/ButtonEdit'
import ButtonDeleteInformationPublic from '../components/button/ButtonDelete'
import ButtonAddDocument from '../components/button/ButtonAddDocument'
import type { IInformationAvailable } from './model'

const InformationAvailableViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<IInformationAvailable>[] = [
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
    { accessorKey: 'judul', header: 'Judul Informasi Berkala' },
    {
      accessorKey: 'slug',
      header: 'Dokumen',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`/modules/ppid/information-public/information-available/${row.original.id_kategori}?title=${row.original.judul}`}
            >
              <Button
                variant={'outline'}
                className="border-[#2769CD] text-[#2769CD] hover:text-[#2769CD]"
              >
                Lihat Daftar Dokumen ({row.original.total_dokumen})
              </Button>
            </Link>
            <ButtonAddDocument
              titleField={row.original.judul}
              idCategory={row.original.id_kategori}
              idName="id_kategori"
              keyLinkPost="information-available-ppip"
              linkPost="/unit-ppid/informasi-tersedia-dokumen"
              title="Informasi Tersedia Setiap Saat"
              labelDokumen="Tambah Dokumen"
            />
          </div>
        )
      },
    },
    { accessorKey: 'urutan', header: 'Urutan' },

    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditInformationPublic
              data={values}
              keyLinkPost={'information-available-ppip'}
              linkPost={`/unit-ppid/informasi-tersedia-kategori/${values.id_kategori}`}
              title="Informasi Tersedia Setiap Saat"
              
            />
            <ButtonDeleteInformationPublic
              data={values}
              keyLinkDelete={'information-available-ppip'}
              linkDelete={`/unit-ppid/informasi-tersedia-kategori/${values.id_kategori}`}
              title="Informasi Tersedia Setiap Saat"
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

export default InformationAvailableViewModel

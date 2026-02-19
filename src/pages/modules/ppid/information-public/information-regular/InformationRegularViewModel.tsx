import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { IInformationRegular } from './model'
import { Button } from '@/components/ui/button'
import ButtonEditInformationPublic from '../components/button/ButtonEdit'
import ButtonDeleteInformationPublic from '../components/button/ButtonDelete'
import ButtonAddDocument from '../components/button/ButtonAddDocument'

const InformationRegularViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<IInformationRegular>[] = [
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
              to={`/modules/ppid/information-public/information-regular/${row.original.id_kategori}?title=${row.original.judul}`}
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
              keyLinkPost="information-regular-ppip"
              linkPost="/unit-ppid/informasi-berkala-dokumen"
              title="Informasi Berkala"
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
              keyLinkPost={'information-regular-ppip'}
              linkPost={`/unit-ppid/informasi-berkala-kategori/${values.id_kategori}`}
              title="Informasi Berkala"
            />
            <ButtonDeleteInformationPublic
              data={values}
              keyLinkDelete={'information-regular-ppip'}
              linkDelete={`/unit-ppid/informasi-berkala-kategori/${values.id_kategori}`}
              title="Informasi Berkala"
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

export default InformationRegularViewModel

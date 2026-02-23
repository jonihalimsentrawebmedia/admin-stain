import { Link, useSearchParams } from 'react-router-dom'
import type { InformationImmediatelyList } from './model'
import type { ColumnDef } from '@tanstack/react-table'
import ButtonSwitch from '@/pages/modules/website-lembaga/pengaturan/landing-page/components/ButtonSwitch'
import { IconEdit } from '@/components/common/table/icon'
import ButtonDelete from './components/ButtonDelete'

const InformationImmediatelyViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<InformationImmediatelyList>[] = [
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
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <img
            src={row.original.url_gambar}
            className="w-[250px] h-[250px] object-cover"
            alt={row.original.key_gambar}
          />
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div
            className="flex gap-2 items-center"
            dangerouslySetInnerHTML={{ __html: values.deskripsi }}
          />
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Status Public',
      cell: ({ row }) => {
        return (
          <ButtonSwitch
            isActive={row.original.public}
            key={'information-immediately-ppid'}
            keyList="information-immediately-unit-ppid"
            data={row.original}
            link={`/unit-ppid/informasi-serta-merta-informasi/${row.original.id_informasi_serta_merta}/toggle-status`}
          />
        )
      },
    },
    // {
    //   accessorKey: 'urutan',
    //   header: 'Urutan',
    // },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`/modules/ppid/information-public/information-immediately/edit/${values.id_informasi_serta_merta}`}
            >
              <IconEdit />
            </Link>
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

export default InformationImmediatelyViewModel

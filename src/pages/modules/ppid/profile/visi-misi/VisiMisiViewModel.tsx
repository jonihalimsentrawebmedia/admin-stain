import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import { IconEdit } from '@/components/common/table/icon'
import ButtonDelete from './components/ButtonDelete'
import type { VisiMisiUnitList } from './model'

const VisiMisiViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<VisiMisiUnitList>[] = [
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
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'isi',
      header: 'Isi ',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div
            className="flex gap-2 tiptap ProseMirror simple-editor html-class items-center"
            dangerouslySetInnerHTML={{ __html: values.isi }}
          />
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Lihat Demo',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="flex gap-2 items-center">
            <Link to={`/modules/ppid/profile/visi-misi/edit/${values.id_visi_misi}`}>
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

export default VisiMisiViewModel

import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import { IconEdit } from '@/components/common/table/icon'
import type { WorkResponsibilitiesList } from './model'
import ButtonDelete from './components/ButtonDelete'

const WorkResponsibilitiesViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<WorkResponsibilitiesList>[] = [
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
            className="flex gap-2 items-center tiptap ProseMirror simple-editor html-class"
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
      header: '',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="flex gap-2 items-center">
            <Link to={`/modules/ppid/profile/work-responsibilities/edit/${values.id_tugas_fungsi_tanggung_jawab}`}>
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

export default WorkResponsibilitiesViewModel

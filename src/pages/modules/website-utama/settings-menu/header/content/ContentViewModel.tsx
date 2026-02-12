import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { ContentList } from './model'
import ButtonDeleteContent from './components/ButtonDelete'
import { HiPencil } from 'react-icons/hi'
import { IoLanguage } from 'react-icons/io5'

const ContentViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const params = useParams()
  const { id } = params
  const navigate = useNavigate()
  const columns: ColumnDef<ContentList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'isi',
      header: 'Isi',
      cell: ({ row }) => {
        return (
          <div
            className={'tiptap ProseMirror simple-editor'}
            dangerouslySetInnerHTML={{ __html: row.original.isi }}
          ></div>
        )
      },
    },

    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center flex-col">
            <Link
              to={`language/${row?.original?.id_konten}`}
              className={'bg-primary p-1.5 rounded text-white'}
            >
              <IoLanguage />
            </Link>
            <Link
              className="bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded text-white"
              to={`/modules/website-utama/pengaturan-menu/header/${id}/content/${row.original.id_konten}/edit`}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteContent data={row.original} />
          </div>
        )
      },
    },
  ]
  function goToAdd() {
    navigate(`/modules/website-utama/pengaturan-menu/header/${id}/content/add`)
  }
  function goToBackground() {
    navigate(`/modules/website-utama/pengaturan-menu/header/${id}/content/background`)
  }
  return { columns, goToAdd, goToBackground }
}

export default ContentViewModel

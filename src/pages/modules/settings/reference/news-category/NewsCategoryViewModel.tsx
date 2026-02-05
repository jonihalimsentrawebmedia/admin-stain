import type { ColumnDef } from '@tanstack/react-table'
import ButtonEditNewsCategory from './components/ButtonEditNewsCategory'
import ButtonDeleteNewsCategory from './components/ButtonDeleteNewsCategory'
import { Link, useSearchParams } from 'react-router-dom'
import { IoLanguage } from 'react-icons/io5'
import type { NewsCategoryList } from '@/pages/modules/settings/reference/news-category/model'

const NewsCategoryViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<NewsCategoryList>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Kategori
    { accessorKey: 'nama_kategori', header: 'Nama Kategori' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex justify-end gap-2 items-center">
            <Link
              to={`language/${values?.id_kategori}`}
              className={'bg-primary text-white p-1.5 rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditNewsCategory data={values} />
            <ButtonDeleteNewsCategory data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default NewsCategoryViewModel

import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import ButtonEditEducationalLevel from './components/ButtonEditEducationalLevel'
import ButtonDeleteEducationalLevel from './components/ButtonDeleteEducationalLevel'
import { IoLanguage } from 'react-icons/io5'
import type { EducationalLevelList } from './model'

const EducationalLevelViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<EducationalLevelList>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    { accessorKey: 'kode_jenjang', header: 'Kode Jenjang Pendidikan' },
    { accessorKey: 'nama_jenjang', header: 'Nama Jenjang Pendidikan' },

    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`language/${values?.id_jenjang}`}
              className={'p-1.5 bg-primary text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditEducationalLevel data={values} />
            <ButtonDeleteEducationalLevel data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default EducationalLevelViewModel

import type { ColumnDef } from '@tanstack/react-table'
import ButtonEditAcademicRank from './components/ButtonEditAcademicRank'
import ButtonDeleteAcademicRank from './components/ButtonDeleteAcademicRank'
import { Link, useSearchParams } from 'react-router-dom'
import type { AcademicRankList } from '@/pages/modules/settings/reference/academic-rank/model'
import { IoLanguage } from 'react-icons/io5'

const AcademicRankViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<AcademicRankList>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Pangkat Akademik
    { accessorKey: 'nama_akademik', header: 'Nama Pangkat Akademik' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center justify-end">
            <Link
              to={`language/${values?.id_akademik}`}
              className={'p-1.5 bg-primary text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditAcademicRank data={values} />
            <ButtonDeleteAcademicRank data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default AcademicRankViewModel

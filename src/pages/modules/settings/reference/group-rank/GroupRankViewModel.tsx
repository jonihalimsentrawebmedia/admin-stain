import type { ColumnDef } from '@tanstack/react-table'
import ButtonDeleteGroupRank from './components/ButtonDeleteGroupRank'
import ButtonEditGroupRank from './components/ButtonEditGroupRank'
import { Link, useSearchParams } from 'react-router-dom'
import { IoLanguage } from 'react-icons/io5'
import type { GroupRankList } from '@/pages/modules/settings/reference/group-rank/model'

const GroupRankViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<GroupRankList>[] = [
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
    { accessorKey: 'nama_golongan', header: 'Nama Pangkat Golongan' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center justify-end">
            <Link
              to={`language/${values?.id_golongan}`}
              className={'bg-primary text-white p-1.5 rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditGroupRank data={values} />
            <ButtonDeleteGroupRank data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default GroupRankViewModel

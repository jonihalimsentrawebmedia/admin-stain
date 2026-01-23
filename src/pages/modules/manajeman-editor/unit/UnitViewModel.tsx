import { IconDetail, IconEdit } from '@/components/common/table/icon'
import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { SatuanOrganisasiList } from '../../settings/model'

const UnitViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const navigate = useNavigate()
  const columns: ColumnDef<SatuanOrganisasiList>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      }, // Menggunakan index baris + 1
    },

    // Kolom ID
    { accessorKey: 'id_satuan_organisasi', header: 'ID' },

    // Kolom ID Parent
    { accessorKey: 'parent_id', header: 'ID Parent' },

    // Kolom Nama Unit
    { accessorKey: 'nama', header: 'Nama Unit' },

    // Kolom Aksi (Icon Biru, Kuning, Merah)
    {
      accessorKey: 'aksi',
      header: '', // Kolom aksi di gambar tidak memiliki header teks
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            {/* Tombol Biru (Asumsi: Detail/Lihat) */}
            <Link to={`/modules/editor/unit/detail/${values.id_satuan_organisasi}`}>
              <IconDetail />
            </Link>
            {/* Tombol Kuning (Asumsi: Edit) */}
            <Link to={`/modules/editor/unit/edit/${values.id_satuan_organisasi}`}>
              <IconEdit />
            </Link>
            {/* Tombol Merah (Asumsi: Delete) */}
          </div>
        )
      },
    },
  ]
  function goToAdd() {
    navigate('/modules/settings/unit/add')
  }
  return {
    columns,
    goToAdd,
  }
}

export default UnitViewModel

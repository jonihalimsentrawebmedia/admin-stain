import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { PublicInformationRegistry } from './model'
import { IconEdit } from '@/components/common/table/icon'
import ButtonDeleteInformationPublic from './components/ButtonDelete'

const InformationPublicRegisterViewModel = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<PublicInformationRegistry>[] = [
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
    { accessorKey: 'ringkasan_isi_informasi', header: 'Ringkasan Isi Informasi' },
    { accessorKey: 'nama_kelompok_organisasi', header: 'Pejabat / Unit /Fakultas yang menguasai' },
    { accessorKey: 'nama_pejabat', header: 'Penanggung jawab Pembuatan / Penerbitan  Informasi' },
    {
      accessorKey: 'waktu_dan_tempat_pembuatan_informasi',
      header: 'Waktu dan Tempat Pembuatan Informasi',
    },
    { accessorKey: 'format_informasi_tersedia', header: 'Format Informasi Tersedia' },
    {
      accessorKey: 'jangka_aktif',
      header: 'Jangka Dan Waktu Penyimpanan',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div>
            Aktif {values.jangka_aktif} <br />
            Inaktif {values.jangka_inaktif}
          </div>
        )
      },
    },

    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={
                '/modules/ppid/information-public/register/edit/' +
                values.id_daftar_informasi_public
              }
            >
              <IconEdit />
            </Link>
            <ButtonDeleteInformationPublic data={values} />
          </div>
        )
      },
    },
  ]

  function goToAdd() {
    navigate('add')
  }
  return {
    columns,
    goToAdd,
  }
}

export default InformationPublicRegisterViewModel

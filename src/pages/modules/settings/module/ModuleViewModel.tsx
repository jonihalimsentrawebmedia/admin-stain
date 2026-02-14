import type { ColumnDef } from '@tanstack/react-table'
import ButtonEditModule from './components/ButtonEditModule'
import ButtonDeleteModule from './components/ButtonDeleteModule'
import { useSearchParams } from 'react-router-dom'
import { ButtonSettings } from '@/pages/modules/settings/module/components/buttonSettings'

const ModuleViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<any>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Icon
    {
      accessorKey: 'gambar',
      header: 'Icon',
      cell: (row) => {
        const values = row.row.original
        // Asumsi nilai 'icon' adalah string yang bisa digunakan sebagai prop atau nama ikon
        // Di sini saya asumsikan IconGear adalah komponen yang digunakan (sesuai gambar)
        return <img src={values.gambar} alt="" width={40} height={40} />
      },
    },

    // ✅ Nama Modul
    { accessorKey: 'nama_module', header: 'Nama Modul' },

    // ✅ Controller
    { accessorKey: 'controller', header: 'Controller' },

    // ✅ Kategori
    { accessorKey: 'kategori', header: 'Kategori' },

    // ✅ Urutan
    { accessorKey: 'urutan', header: 'Urutan' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditModule data={values} />
            <ButtonDeleteModule data={values} />
            {values?.kategori.toLowerCase() === 'website_prodi' && (
              <ButtonSettings kelompok={'PRODI'} data={values} />
            )}
            {values?.kategori.toLowerCase() === 'website_unit' && (
              <ButtonSettings kelompok={'UNIT'} data={values} />
            )}
            {values?.kategori.toLowerCase() === 'website_lembaga' && (
              <ButtonSettings kelompok={'LEMBAGA'} data={values} />
            )}
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default ModuleViewModel

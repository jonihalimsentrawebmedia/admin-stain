import type { ColumnDef } from '@tanstack/react-table'
import ButtonEditDomain from './components/ButtonEditDomain'
import ButtonDeleteDomain from './components/ButtonDeleteDomain'
import type { DomainList } from './model'
import { useSearchParams } from 'react-router-dom'

const DomainViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<DomainList>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Jenis Modul

    // ✅ Kelompok
    { accessorKey: 'kelompok', header: 'Kelompok' },

    { accessorKey: 'nama_satuan_organisasi', header: 'Satuan Organisasi' },

    // ✅ Nama
    // { accessorKey: "nama", header: "Nama" },

    // ✅ Domain
    { accessorKey: 'domain', header: 'Domain' },

    // ✅ IP Server
    { accessorKey: 'ip', header: 'IP Server' },

    // ✅ Endpoint BE
    { accessorKey: 'endpoint_be', header: 'Endpoint BE' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditDomain data={values} />
            <ButtonDeleteDomain data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default DomainViewModel

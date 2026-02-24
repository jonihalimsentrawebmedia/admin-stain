import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { ServiceCommitmentList } from './model'
import { IconEdit } from '@/components/common/table/icon'
import ButtonDelete from './components/ButtonDelete'
import ButtonSwitch from '@/pages/modules/website-lembaga/pengaturan/landing-page/components/ButtonSwitch'

const ServiceCommitmentViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<ServiceCommitmentList>[] = [
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
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <img
            src={row.original.url_gambar}
            className="w-[250px] h-[250px] object-cover"
            alt={row.original.key_gambar}
          />
        )
      },
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div
            className=" tiptap ProseMirror simple-editor html-class"
            dangerouslySetInnerHTML={{ __html: values.deskripsi }}
          />
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Status Public',
      cell: ({ row }) => {
        return (
          <ButtonSwitch
            isActive={row.original.public}
            key={'service-commitment-unit-ppid'}
            keyList="service-commitment-unit-ppid"
            data={row.original}
            link={`/unit-ppid/maklumat-layanan/${row.original.id_maklumat_layanan}/toggle-status`}
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
      header: 'Lihat Demo',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`/modules/ppid/profile/service-commitment/edit/${values.id_maklumat_layanan}`}
            >
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

export default ServiceCommitmentViewModel

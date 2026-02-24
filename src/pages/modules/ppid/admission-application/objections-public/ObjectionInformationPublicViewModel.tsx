import { Link, useSearchParams } from 'react-router-dom'
import type { ObjectionsPublic } from './model'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { statusEmail } from '../information-public/utils'
import { Button } from '@/components/ui/button'
import { IconDetail2 } from '@/components/common/table/icon'
import ButtonEmail from './components/ButtonEmail'

const ObjectionInformationPublicViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<ObjectionsPublic>[] = [
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
    { accessorKey: 'nama_lengkap', header: 'Nama Lengkap' },
    {
      accessorKey: 'alamat_ktp',
      header: 'Alamat',
    },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'no_hp', header: 'No. HP' },
    {
      accessorKey: 'alasan_penolakan',
      header: 'Alasan Penolakan',
      cell: (row) => {
        const values = row.row.original
        return (
          <ul className="ml-4 pl-4 list-decimal list-outside">
            {values.alasan_keberatan.map((alasan, index) => (
              <li key={index}>{alasan}</li>
            ))}
          </ul>
        )
      },
    },
    { accessorKey: 'tujuan_penggunaan_informasi', header: 'Tujuan Penggunaan Informasi' },
    {
      accessorKey: 'tanggal_permohonan',
      header: 'Tanggal Masuk Pesan',
      cell: (row) => {
        const values = row.row.original
        return <div>{format(values?.tanggal_permohonan, 'dd-MM-yyyy, HH:mm:ss')}</div>
      },
    },

    {
      accessorKey: 'status_terjawab',
      header: 'Status Email',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="space-y-1">
            <div> {statusEmail(values.status_terjawab)}</div>
            <ButtonEmail isForTable={true} data={values} id={values.id_permohonan} />
            <Link to={`log/${values.id_permohonan}`}>
              <Button variant="outline" className="border-primary text-primary hover:text-primary">
                Riwayat Email
              </Button>
            </Link>
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
            <Link to={`detail/${values.id_permohonan}`}>
              <IconDetail2 />
            </Link>
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default ObjectionInformationPublicViewModel

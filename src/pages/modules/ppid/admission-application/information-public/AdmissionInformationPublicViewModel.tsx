import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import type { AdmissionINformationPublic } from './model'
import { IconDetail2 } from '@/components/common/table/icon'
import { Button } from '@/components/ui/button'
import ButtonEmail from './components/ButtonEmail'
import { format } from 'date-fns'
import { statusEmail } from './utils'

const AdmissionInformationPublicViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<AdmissionINformationPublic>[] = [
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
  
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'no_hp', header: 'No. HP' },
    { accessorKey: 'jenis_informasi_dibutuhkan', header: 'Jenis Informasi Yang Dibutuhkan' },
    { accessorKey: 'tujuan_penggunaan_informasi', header: 'Tujuan Penggunaan Informasi' },
    {
      accessorKey: 'tanggal_permohonan',
      header: 'Tanggal Masuk Pesan',
      cell: (row) => {
        const values = row.row.original
        return <div>{format(values?.tanggal_permohonan, 'dd-MM-yyyy, HH:mm:ss')}</div>
      },
    },
    { accessorKey: 'status_permohonan', header: 'Status Permohonan' },
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

export default AdmissionInformationPublicViewModel

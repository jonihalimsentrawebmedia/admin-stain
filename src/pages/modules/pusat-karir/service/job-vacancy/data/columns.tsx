import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'
import { format } from 'date-fns'
import { HiPencil } from 'react-icons/hi'
import { MdInfo } from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { ButtonDeleteJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/component/buttonDelete.tsx'

export const ColumnsJobVacancy = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IJobVacancy>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'lowongan_internal',
      header: 'Pembuka Lowongan',
      cell: ({ row }) => {
        return <p>{row?.original?.nama_mitra_kerja}</p>
      },
    },
    {
      accessorKey: 'nama_pekerjaan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'jenis_pekerjaan',
      header: 'jenis Pekerjaan',
    },
    {
      accessorKey: 'jenis_lokasi_kerja',
      header: 'Lokasi Pekerjaan',
      cell: ({ row }) => {
        const { jenis_lokasi_kerja, nama_kabupaten, nama_provinsi } = row.original
        return (
          <p>
            {jenis_lokasi_kerja}-{nama_kabupaten}, {nama_provinsi}
          </p>
        )
      },
    },
    {
      accessorKey: 'kouta_pekerjaan',
      header: 'Kouta',
    },
    {
      accessorKey: 'tgl_buka_pekerjaan',
      header: 'Periode',
      cell: ({ row }) => {
        return (
          <p>
            {format(row?.original?.tgl_buka_pekerjaan, 'dd-MM-yyyy')} s.d{' '}
            {format(row?.original?.tgl_tutup_pekerjaan, 'dd-MM-yyyy')}
          </p>
        )
      },
    },
    {
      accessorKey: 'jumlah_pelamar',
      header: 'Lihat Pelamar',
      cell: ({ row }) => {
        const { jumlah_pelamar, id_lowongan_pekerjaan } = row?.original
        return (
          <Link to={`${id_lowongan_pekerjaan}/applicant`}>
            <Button
              variant={'outline'}
              size={'sm'}
              className={'border-primary text-primary hover:text-primary'}
            >
              <FaUserFriends />
              Lihat Pelamar ({jumlah_pelamar})
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Link
            to={`${row?.original.id_lowongan_pekerjaan}/detail`}
            className={'p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded'}
          >
            <MdInfo />
          </Link>
          <Link
            to={`${row?.original.id_lowongan_pekerjaan}/edit`}
            className={'p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded'}
          >
            <HiPencil />
          </Link>
          <ButtonDeleteJobVacancy data={row?.original} />
        </div>
      ),
    },
  ]

  return columns
}

import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITrainingList } from '@/pages/modules/Pulsikom/training/list-training/data/types.ts'
import { format } from 'date-fns'
import { clsx } from 'clsx'
import { Check } from 'lucide-react'
import { BiX } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteTraining } from '@/pages/modules/Pulsikom/training/list-training/component/buttonDelete.tsx'
import { ButtonPublish } from '@/pages/modules/Pulsikom/training/list-training/component/buttonPublish.tsx'
import { MdInfo } from 'react-icons/md'
import { ButtonCloseTraining } from '@/pages/modules/Pulsikom/training/list-training/component/buttonClose.tsx'

export const ColumnsListTraining = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ITrainingList>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_training',
      header: 'Nama Training',
    },
    {
      accessorKey: 'status_pengisian',
      header: 'Status Pengisian',
      cell: ({ row }) => {
        const data = row?.original
        const status = data?.status_pengisian
        return (
          <ul>
            <li
              className={clsx(
                status?.is_informasi_pendaftaran ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {status?.is_informasi_pendaftaran ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Informasi Pendaftaran
            </li>
            <li
              className={clsx(
                status?.is_topik_bahasan_jadwal ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {status?.is_topik_bahasan_jadwal ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Topik Bahasan & Jadwal
            </li>
            <li
              className={clsx(
                status?.is_persyaratan ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {status?.is_persyaratan ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Persyaratan
            </li>
            <li
              className={clsx(
                status?.is_biaya_pendaftaran ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {status?.is_biaya_pendaftaran ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Biaya Pendaftaran
            </li>
            <li
              className={clsx(
                status?.is_rekening_penerimaan ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {status?.is_rekening_penerimaan ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Rekening Penerimaan
            </li>
            <li
              className={clsx(
                status?.is_kontak_catatan_tambahan ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {status?.is_kontak_catatan_tambahan ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Kontak & Catatan Tambahan
            </li>
          </ul>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Dibuat',
      cell: ({ row }) => {
        const data = row?.original
        return <p> {data?.created_at ? format(data?.created_at, 'dd-MM-yyyy, HH:mm:ss') : ''}</p>
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Terakhir Edit',
      cell: ({ row }) => {
        const data = row?.original
        return <p> {data?.updated_at ? format(data?.updated_at, 'dd-MM-yyyy, HH:mm:ss') : ''}</p>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex flex-col gap-1.5">
              <ButtonPublish data={data} />
              <Link
                onClick={() =>
                  window.localStorage.setItem('id_training', data?.id_training as string)
                }
                to={`edit/${data?.id_training}`}
                className={'p-1.5 bg-yellow-500 rounded hover:bg-yellow-600 text-white w-fit'}
              >
                <HiPencil className={'size-4'} />
              </Link>
              <ButtonDeleteTraining data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export const ColumnsPublishTraining = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ITrainingList>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_training',
      header: 'Nama Training',
    },
    {
      accessorKey: 'created_at',
      header: 'Tgl. Terbit',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.terbit_at ? format(data?.terbit_at, 'dd-MM-yyyy HH:mm:ss') : ''}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'periode',
      header: 'Periode',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className={'flex items-center gap-1.5'}>
              <p>
                {data?.tgl_buka_pendaftaran ? format(data?.tgl_buka_pendaftaran, 'dd-MM-yyyy') : ''}
              </p>
              <p>s.d</p>
              <p>
                {data?.tgl_tutup_pendaftaran
                  ? format(data?.tgl_tutup_pendaftaran, 'dd-MM-yyyy')
                  : ''}
              </p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'minimal_pendaftar',
      header: 'Minimal',
    },
    {
      accessorKey: 'maksimal_pendaftar',
      header: 'Maksimal',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.is_tidak_ada_batas ? 'Tidak Ada Batas' : data?.maksimal_pendaftar}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'pending',
      header: 'Pending',
    },
    {
      accessorKey: 'terkonfirmasi',
      header: 'Terkonfirmasi',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex gap-1.5">
              <Link
                onClick={() =>
                  window.localStorage.setItem('id_training', data?.id_training as string)
                }
                to={`detail/${data?.id_training}`}
                className={'p-1.5 bg-blue-500 rounded hover:bg-blue-600 text-white w-fit'}
              >
                <MdInfo className={'size-4'} />
              </Link>
              <Link
                onClick={() =>
                  window.localStorage.setItem('id_training', data?.id_training as string)
                }
                to={`edit/${data?.id_training}`}
                className={'p-1.5 bg-yellow-500 rounded hover:bg-yellow-600 text-white w-fit'}
              >
                <HiPencil className={'size-4'} />
              </Link>
              <ButtonCloseTraining data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

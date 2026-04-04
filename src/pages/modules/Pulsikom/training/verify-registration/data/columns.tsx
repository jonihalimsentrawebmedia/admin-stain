import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITrainingList } from '@/pages/modules/Pulsikom/training/list-training/data/types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'
import type { IProgramList } from '@/pages/modules/Pulsikom/training/credit-earning/Program/data/types.ts'

export const ColumnsTrainingVerify = () => {
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
                to={`training/${data?.id_training}`}
                className={'p-1.5 bg-blue-500 rounded hover:bg-blue-600 text-white w-fit'}
              >
                <MdInfo className={'size-4'} />
              </Link>
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export const ColumnsProgramVerify = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IProgramList>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_program',
      header: 'nama_program',
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
                  window.localStorage.setItem('id_program', data?.id_program as string)
                }
                to={`program/${data?.id_program}`}
                className={'p-1.5 bg-blue-500 rounded hover:bg-blue-600 text-white w-fit'}
              >
                <MdInfo className={'size-4'} />
              </Link>
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

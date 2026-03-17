import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteSurvey } from '@/pages/modules/pusat-karir/survey/component/buttonDelete.tsx'
import { ButtonPublish } from '@/pages/modules/pusat-karir/survey/component/buttonPublish.tsx'
import { ButtonChangeDate } from '@/pages/modules/pusat-karir/survey/component/buttonChangeDate.tsx'
import { ButtonCopy } from '@/pages/modules/pusat-karir/survey/component/form/buttonCoppy.tsx'
import { ButtonArchive } from '@/pages/modules/pusat-karir/survey/component/form/buttonArchive.tsx'
import { BiSolidBarChartAlt2 } from 'react-icons/bi'
import { ButtonPublishAgain } from '@/pages/modules/pusat-karir/survey/component/buttonAgain.tsx'
import { ButtonDraft } from '@/pages/modules/pusat-karir/survey/component/buttonDraft.tsx'

export const SurveyColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISurveyQuestion>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'created_at',
      header: 'Dibuat',
      cell: ({ row }) => {
        return <>{row.original.created_at ? format(row?.original.created_at, 'dd-MM-yyyy') : ''}</>
      },
    },
    {
      accessorKey: 'id_survei_pertanyaan',
      header: 'Terbitkan',
      cell: ({ row }) => {
        return (
          <>
            <ButtonPublish data={row?.original} />
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <>
          <div className={'flex justify-center gap-1.5'}>
            <Link
              to={`${row?.original?.id_survei_pertanyaan}/detail`}
              className={'p-1.5 bg-blue-500 flex w-fit rounded text-white'}
            >
              <MdInfo className={'size-4'} />
            </Link>
            <Link
              to={`${row?.original?.id_survei_pertanyaan}/edit`}
              className={'p-1.5 bg-yellow-500 flex w-fit rounded text-white'}
            >
              <HiPencil className={'size-4'} />
            </Link>
            <ButtonDeleteSurvey data={row?.original} />
          </div>
        </>
      ),
    },
  ]

  return columns
}

export const PublishSurveyColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISurveyQuestion>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'tanggal_mulai',
      header: 'Periode Pengisian',
      cell: ({ row }) => {
        const Start_date = new Date(row.original.tanggal_mulai)
        const End_date = new Date(row.original.tanggal_selesai)
        const Now_date = new Date()

        return (
          <>
            <div className={'flex gap-1.5 items-center'}>
              <p>
                {row.original.tanggal_mulai
                  ? format(row?.original.tanggal_mulai, 'dd-MM-yyyy')
                  : ''}
              </p>
              <p>s.d</p>
              <p>
                {row.original.tanggal_selesai
                  ? format(row?.original.tanggal_selesai, 'dd-MM-yyyy')
                  : ''}
              </p>
            </div>
            {Start_date > Now_date ? (
              <p className="text-yellow-500 font-semibold">Belum Dibuka</p>
            ) : End_date < Now_date ? (
              <p className="text-red-500 font-semibold">Telah Berakhir</p>
            ) : (
              <p className="text-blue-500 font-semibold">Berlangsung</p>
            )}
          </>
        )
      },
    },
    {
      accessorKey: 'kategori_responden',
      header: 'Kategori Responden',
    },
    {
      accessorKey: 'jumlah_responden',
      header: 'Jumlah Responden',
    },
    {
      accessorKey: 'tanggal_mulai',
      header: 'Kembalikan Ke Draft',
      cell: ({ row }) => {
        const startDate = new Date(row.original.tanggal_mulai)
        const NowDate = new Date()

        return <>{startDate > NowDate && <ButtonDraft data={row?.original} />}</>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <>
          <div className="flex items-center justify-end gap-2.5">
            <Link
              to={`${row?.original?.id_survei_pertanyaan}/statistic`}
              className={`p-1.5 bg-blue-500 flex w-fit rounded text-white`}
            >
              <BiSolidBarChartAlt2 className={'size-4'} />
            </Link>
            <ButtonChangeDate data={row?.original} />
            <ButtonCopy data={row?.original} />
            <ButtonArchive data={row?.original} />
          </div>
        </>
      ),
    },
  ]

  return columns
}

export const ArchivedSurveyColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISurveyQuestion>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'tanggal_mulai',
      header: 'Periode Pengisian',
      cell: ({ row }) => {
        const Start_date = new Date(row.original.tanggal_mulai)
        const End_date = new Date(row.original.tanggal_selesai)
        const Now_date = new Date()

        return (
          <>
            <div className={'flex gap-1.5 items-center'}>
              <p>
                {row.original.tanggal_mulai
                  ? format(row?.original.tanggal_mulai, 'dd-MM-yyyy')
                  : ''}
              </p>
              <p>s.d</p>
              <p>
                {row.original.tanggal_selesai
                  ? format(row?.original.tanggal_selesai, 'dd-MM-yyyy')
                  : ''}
              </p>
            </div>
            {Start_date > Now_date ? (
              <p className="text-yellow-500 font-semibold">Belum Dibuka</p>
            ) : End_date < Now_date ? (
              <p className="text-red-500 font-semibold">Telah Berakhir</p>
            ) : (
              <p className="text-blue-500 font-semibold">Berlangsung</p>
            )}
          </>
        )
      },
    },
    {
      accessorKey: 'kategori_responden',
      header: 'Kategori Responden',
    },
    {
      accessorKey: 'jumlah_responden',
      header: 'Jumlah Responden',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <>
          <div className="flex items-center justify-end gap-2.5">
            <Link
              to={`${row?.original?.id_survei_pertanyaan}/statistic`}
              className={`p-1.5 bg-blue-500 flex w-fit rounded text-white`}
            >
              <BiSolidBarChartAlt2 className={'size-4'} />
            </Link>
            <ButtonPublishAgain data={row?.original} />
            <ButtonCopy />
            <ButtonDeleteSurvey data={row?.original} />
          </div>
        </>
      ),
    },
  ]

  return columns
}

import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISurvey } from '@/pages/modules/E-Office/questionnaire/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteQuestionnaire from '@/pages/modules/E-Office/questionnaire/component/buttonDelete.tsx'
import { MdInfo } from 'react-icons/md'

export const ColumnsSurvey = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISurvey>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'jenis_survei',
      header: 'Jenis Kuesioner',
    },
    {
      accessorKey: 'judul',
      header: 'Judul Kuesioner',
    },
    {
      accessorKey: 'jumlah_pertanyaan',
      header: 'Jumlah Pertanyaan',
    },
    {
      accessorKey: 'diisi',
      header: 'Diisi',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center gap-2 justify-center">
              <Link
                className={'p-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded'}
                to={`${data?.jenis_survei === 'KUALITATIF' ? 'qualitative' : 'quantitative'}/detail/${data?.id_survei}`}
              >
                <MdInfo />
              </Link>
              <Link
                className={'p-1.5 text-white bg-yellow-500 hover:bg-yellow-600 rounded'}
                to={`${data?.jenis_survei === 'KUALITATIF' ? 'qualitative' : 'quantitative'}/edit/${data?.id_survei}`}
              >
                <HiPencil />
              </Link>
              <ButtonDeleteQuestionnaire data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

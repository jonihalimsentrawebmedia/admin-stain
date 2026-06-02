import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISurveyQuestionResult } from '@/pages/modules/E-Office/questionnaire/data/types.ts'

export const ColumnsResultQuantitative = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISurveyQuestionResult>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'pertanyaan',
      header: 'Pertanyaan',
    },
    {
      accessorKey: 'opsi1',
      header: 'Opsi 1',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="text-center">
              <p>{data?.hasil[0]?.opsi}</p>
              <p>({data?.hasil[0]?.jumlah})</p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'opsi2',
      header: 'Opsi 2',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="text-center">
              <p>{data?.hasil[1]?.opsi}</p>
              <p>({data?.hasil[1]?.jumlah})</p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'opsi3',
      header: 'Opsi 3',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="text-center">
              <p>{data?.hasil[2]?.opsi}</p>
              <p>({data?.hasil[2]?.jumlah})</p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'opsi4',
      header: 'Opsi 4',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="text-center">
              <p>{data?.hasil[3]?.opsi}</p>
              <p>({data?.hasil[3]?.jumlah})</p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'opsi5',
      header: 'Opsi 5',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="text-center">
              <p>{data?.hasil[4]?.opsi}</p>
              <p>({data?.hasil[4]?.jumlah})</p>
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

export const ColumnsResultQualitative = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISurveyQuestionResult>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'pertanyaan',
      header: 'Pertanyaan',
    },
  ]

  return columns
}

import type { ColumnDef } from '@tanstack/react-table'
import type { IlogData } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/index.ts'
import { useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'

export const ColumnsLog = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IlogData>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'jenis_data',
      header: 'Jenis Data',
    },
    {
      accessorKey: 'update_by',
      header: 'Diperbaharui Oleh',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.nama_user}</p>
            <p>{data?.diubah_pada ? format(data?.diubah_pada, 'dd-MM-yyyy, HH:mm:ss') : '-'}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'data_lama',
      header: 'Data Sebelumnya',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div>
            {data?.jenis_data === 'Gambar' ? (
              <img
                src={data?.data_lama as any}
                alt="img"
                className="w-[400px] h-[240px] rounded object-cover"
              />
            ) : (
              <div>
                <div dangerouslySetInnerHTML={{ __html: data?.data_lama ?? '' }} />
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'data_baru',
      header: 'Data Hasil Perubahan',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div>
            {data?.jenis_data === 'Gambar' ? (
              <img
                src={data?.data_baru as any}
                alt="img"
                className="w-[400px] h-[240px] rounded object-cover"
              />
            ) : (
              <div>
                <div
                  className={'whitespace-pre-line'}
                  dangerouslySetInnerHTML={{ __html: data?.data_baru ?? '' }}
                />
              </div>
            )}
          </div>
        )
      },
    },
  ]
  return columns
}

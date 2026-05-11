import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPublication } from '@/pages/modules/website-utama/publication/data/types.ts'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'

export const ColumnsPublication = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IPublication>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_sdm',
      header: 'Nama Dosen',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.nama_sdm}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'judul_publikasi',
      header: 'Judul',
    },
    {
      accessorKey: 'jenis_publikasi',
      header: 'Jenis Publikasi',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <ul>
              {data.penulis.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )
      },
    },
    {
      accessorKey: 'tanggal_terbit',
      header: 'Tanggal Terbit',
      cell: ({ row }) => {
        const data = row.original
        return <>{data.tanggal_terbit ? format(data.tanggal_terbit, 'dd-MM-yyyy') : ''}</>
      },
    },
    {
      accessorKey: 'url_jurnal',
      header: 'URL Jurnal',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Link to={data?.url_jurnal ?? '#'}>
              <Button variant={'outline'} className={'border-primary text-primary hover:text-primary'}>
                Buka Link Jurnal
              </Button>
            </Link>
          </>
        )
      },
    },
  ]

  return columns
}

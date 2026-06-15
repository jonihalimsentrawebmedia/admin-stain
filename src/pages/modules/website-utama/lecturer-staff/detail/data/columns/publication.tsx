import { Link, useParams, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPublication } from '@/pages/modules/website-utama/lecturer-staff/detail/data/types.ts'
import { ButtonEditPublication } from '@/pages/modules/website-utama/lecturer-staff/detail/components/publication/buttonEdit.tsx'
import { ButtonDeletePublication } from '@/pages/modules/website-utama/lecturer-staff/detail/components/publication/buttonDelete.tsx'
import { Button } from '@/components/ui/button.tsx'

export const publicationColumns = () => {
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
      accessorKey: 'judul_publikasi',
      header: 'Judul Publikasi',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div>
            <p>{data?.penulis?.map((row) => row?.nama_penulis).join(', ')}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'jenis_publikasi',
      header: 'jenis_publikasi',
    },
    {
      accessorKey: 'tanggal_terbit',
      header: 'Tanggal Publikasi',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div>
            <p>{data?.tanggal_terbit ?? '-'}</p>
            {/*<p>{data?.tanggal_terbit ? format(data?.tanggal_terbit, 'dd-MM-yyyy') : ''}</p>*/}
          </div>
        )
      },
    },
    {
      accessorKey: 'url_jurnal',
      header: 'URL Jurnal',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            {data?.url_jurnal && (
              <Link to={data?.url_jurnal} target={'_blank'}>
                <Button
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  Link Publikasi
                </Button>
              </Link>
            )}
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        const { id } = useParams()
        return (
          <>
            <div className="flex items-center gap-2">
              <ButtonEditPublication data={data} id_sdm={id as string} />
              <ButtonDeletePublication data={data} id_sdm={id as string} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

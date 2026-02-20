import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ButtonEdit from './components/ButtonEdit'
import ButtonDelete from './components/ButtonDelete'
import type { ReportSurvey } from './model'

const ReportSurveyViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<ReportSurvey>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return <img className="w-36 h-[180px] object-cover" src={row.original.url_gambar} />
      },
    },

    // ✅ Nama Pangkat Golongan
    { accessorKey: 'nama_laporan', header: 'Nama Laporan' },
    {
      accessorKey: 'url',
      header: 'Buka Laporan',
      cell: ({ row }) => {
        const values = row.original
        return (
          <div className="flex gap-2 items-center">
            {values.jenis.toLocaleLowerCase() == 'dokumen' ? (
              <Button
                variant={'outline'}
                className="border-primary text-primary hover:text-primary"
                onClick={() => window.open(values.url_file, '_blank')}
              >
                Buka Laporan
              </Button>
            ) : (
              <Button
                variant={'outline'}
                className="border-primary text-primary hover:text-primary"
                onClick={() => window.open(values.url ?? '', '_blank')}
              >
                URL
              </Button>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'public',
      header: 'Public / Tidak',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            {row.original.public ? 'Public' : 'Tidak Public'}
          </div>
        )
      },
    },
    { accessorKey: 'urutan', header: 'Urutan' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEdit data={values} />
            <ButtonDelete data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default ReportSurveyViewModel

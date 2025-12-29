import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStudentLetter } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/types/index.ts'
import { Button } from '@/components/ui/button.tsx'
import { ButtonEditLetter } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/components/buttonEditLetter.tsx'
import { ButtonDeleteLetter } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/components/buttonDelete.tsx'

export const ColumnsStudentLetter = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IStudentLetter>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'judul_surat',
      header: 'Judul Surat',
    },
    {
      accessorKey: 'keterangan',
      header: 'Keterangan',
    },
    {
      accessorKey: 'link_google_form',
      header: 'Link Google Form',
      cell: ({ row }) => {
        return (
          <Link to={row.original.link_google_form} target="_blank" className="text-primary">
            <Button
              variant={'outline'}
              className={'text-primary border-primary hover:text-primary'}
            >
              Buka Link
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'log_Data',
      header: 'Log Data',
      cell: ({ row }) => {
        return (
          <Link
            to={`log/${row?.original?.id_surat_mahasiswa_surat_keterangan_mahasiswa}`}
            className="text-primary"
          >
            <Button
              variant={'outline'}
              className={'text-blue-500 border-blue-500 hover:text-blue-500'}
            >
              Lihat Log
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex items-center gap-2">
              <ButtonEditLetter data={row.original} />
              <ButtonDeleteLetter data={row.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITestimonialCampusLife } from '@/pages/modules/website-utama/campus-life/types/index.ts'
import { Button } from '@/components/ui/button.tsx'
import { ButtonEditTestimonial } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/Testimoni/buttonEdit.tsx'
import { ButtonDeleteTestimonial } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/Testimoni/buttonDelete.tsx'

export const TestimonialColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ITestimonialCampusLife>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Nama',
      cell: ({ row }) => {
        const { nama_lengkap, foto_url } = row.original

        return (
          <div className={'flex items-center gap-2 flex-col lg:flex-row'}>
            <img src={foto_url} alt="profile" className={'w-10 h-14 object-cover rounded'} />
            <p>{nama_lengkap}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'pekerjaan',
      header: 'Pekerjaan',
    },
    {
      accessorKey: 'komentar',
      header: 'Komentar',
    },
    {
      accessorKey: 'log_Data',
      header: 'Log Data',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_kehidupan_kampus_testimoni}`}>
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
          <div className={'flex gap-2 items-center'}>
            <ButtonEditTestimonial data={row.original} />
            <ButtonDeleteTestimonial data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}

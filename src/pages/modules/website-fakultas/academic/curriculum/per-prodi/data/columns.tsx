import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import type { ISessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'
import { ButtonEditCurriculum } from '@/pages/modules/website-fakultas/academic/curriculum/per-prodi/component/buttonEdit.tsx'
import {
  ButtonDeleteCurriculum
} from '@/pages/modules/website-fakultas/academic/curriculum/per-prodi/component/buttonDelete.tsx'

export const ColumnsCurriculum = (session?: ISessionFaculty) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ICurriculum>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_kurikulum',
      header: 'Nama Kurikulum',
    },
    {
      accessorKey: 'id_kurikulum',
      header: 'Mata Kuliah',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Link to={`subject/${data?.id_kurikulum}`}>
              <Button
                className={'text-primary hover:text-primary border-primary'}
                variant={'outline'}
              >
                Lihat Mata Kuliah
                <FaForward />
              </Button>
            </Link>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center gap-1.5">
              <ButtonEditCurriculum data={data} session={session} />
              <ButtonDeleteCurriculum data={data} session={session} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

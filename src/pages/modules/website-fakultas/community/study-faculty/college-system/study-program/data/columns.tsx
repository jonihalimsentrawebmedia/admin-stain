import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IProgramStudy } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program/data/types.ts'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { ButtonEditStudyProgram } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program/component/buttonEdit.tsx'
import { ButtonDeleteStudyProgram } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program/component/buttondelete.tsx'

export const ColumnsCollegeSystemStudy = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IProgramStudy>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_program_pendidikan',
      header: 'Program Pendidikan',
    },
    {
      accessorKey: 'deskripsi_program_pendidikan',
      header: 'Deskripsi',
      cell: ({ row }) => {
        const data = row?.original
        return <RenderHTMLContent content={data?.deskripsi_program_pendidikan ?? ''} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex items-center gap-1.5">
              <ButtonEditStudyProgram data={row?.original} />
              <ButtonDeleteStudyProgram data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

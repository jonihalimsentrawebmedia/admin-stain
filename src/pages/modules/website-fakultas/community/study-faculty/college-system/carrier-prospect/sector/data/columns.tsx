import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISectorStudy } from '../data/types'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { ButtonEditSectorCarrierProspect } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect/sector/component/buttonEdit.tsx'
import { ButtonDeleteSectorCarrier } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect/sector/component/buttonDelete.tsx'

export const ColumnsSectorStudy = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ISectorStudy>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_sektor_pendidikan',
      header: 'Sektor Pekerjaan',
    },
    {
      accessorKey: 'deskripsi_program_pendidikan',
      header: 'Deskripsi',
      cell: ({ row }) => {
        const data = row?.original
        return <RenderHTMLContent content={data?.deskripsi_sektor_pendidikan ?? ''} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className="flex items-center justify-center gap-2">
              <ButtonEditSectorCarrierProspect data={row?.original} />
              <ButtonDeleteSectorCarrier data={row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

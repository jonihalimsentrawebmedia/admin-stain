import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { MinutesEvent } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/meeting-minutes/hooks.tsx'
import ButtonEditMeetingMinutes from '@/pages/modules/E-Office/event-activity/event-data/detail/component/meeting-minutes/buttonEdit.tsx'
import { ButtonDeleteMinutesEvent } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/meeting-minutes/buttonDelete.tsx'

export const ColumnsMeetingMinutes = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<MinutesEvent>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Siapa (Nama Lengkap)',
    },
    {
      accessorKey: 'isi_notulen',
      header: 'Isi',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center justify-end gap-2'}>
            <ButtonEditMeetingMinutes data={data} />
            <ButtonDeleteMinutesEvent data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

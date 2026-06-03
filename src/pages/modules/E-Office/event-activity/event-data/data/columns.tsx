import type { ColumnDef } from '@tanstack/react-table'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import { Link, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { MdInfo, MdPrint } from 'react-icons/md'
import ButtonEditEvent from '@/pages/modules/E-Office/event-activity/event-data/component/buttonEdit.tsx'
import ButtonDeleteEvent from '@/pages/modules/E-Office/event-activity/event-data/component/buttonDelete.tsx'
import { Button } from '@/components/ui/button.tsx'

export const ColumnsEvent = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IEvent>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nama_kegiatan',
      header: 'Nama Event',
    },
    {
      accessorKey: 'tanggal_mulai',
      header: 'Hari, Tanggal',
      cell: ({ row }) => {
        const start_date = row.original.tanggal_mulai
        const end_date = row.original.tanggal_selesai
        return (
          <div className={'text-center'}>
            <p>{format(start_date, 'EEEE, dd-MM-yyyy', { locale: id })}</p>
            <p>s.d</p>
            <p>{format(end_date, 'EEEE, dd-MM-yyyy', { locale: id })}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'waktu',
      header: 'Waktu',
    },
    {
      accessorKey: 'tempat',
      header: 'Tempat',
    },
    {
      accessorKey: 'penyelenggara',
      header: 'Penyelenggara',
    },
    {
      accessorKey: 'id_acara',
      header: 'Daftar Hadir',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Link to={`print/${data?.id_acara}`}>
              <Button
                variant={'outline'}
                className={'border-primary text-primary rounded-full hover:text-primary'}
              >
                <MdPrint className={'size-4'} />
                Cetak
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
        const data = row.original
        return (
          <>
            <div className="flex items-center justify-center gap-1.5">
              <Link to={`detail/${data?.id_acara}`}>
                <button className="p-1.5 text-blue-500 bg-primary/15 hover:bg-primary/15 rounded">
                  <MdInfo className={'size-5'} />
                </button>
              </Link>
              <ButtonEditEvent data={data} />
              <ButtonDeleteEvent data={data} />
            </div>
          </>
        )
      },
    },
  ]
  return columns
}

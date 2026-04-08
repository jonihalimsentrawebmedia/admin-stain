import type { IOfficially } from './types'
import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { ButtonEditOfficially } from '../component/buttonEdit.tsx'
import { ButtonDeleteOfficially } from '../component/buttonDelete.tsx'

export const ColumnsOfficially = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam?.get('page') ?? '1')
  const limit = Number(searchParam?.get('limit') ?? '10')

  const columns: ColumnDef<IOfficially>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'url_gambar',
      header: 'Foto',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <img
            src={data?.url_gambar}
            alt="Foto"
            className={'w-[30px] h-[40px] object-cover rounded'}
          />
        )
      },
    },
    {
      accessorKey: 'nama_penjabat',
      header: 'Nama Pejabat',
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className={'flex items-center gap-1.5'}>
              <ButtonEditOfficially data={data} />
              <ButtonDeleteOfficially data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

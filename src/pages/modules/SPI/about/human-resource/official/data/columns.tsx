import type { IOfficial } from './types'
import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { ButtonEditOfficial } from '../component/buttonEdit.tsx'
import { ButtonDeleteOfficial } from '../component/buttonDelete.tsx'

export const ColumnsOfficial = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam?.get('page') ?? '1')
  const limit = Number(searchParam?.get('limit') ?? '10')

  const columns: ColumnDef<IOfficial>[] = [
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
              <ButtonEditOfficial data={data} />
              <ButtonDeleteOfficial data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

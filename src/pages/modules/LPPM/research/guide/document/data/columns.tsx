import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IGuideBookDocument } from './types'
import { FiExternalLink } from 'react-icons/fi'
import { ButtonEditDocumentGuideBook } from '../component/buttonEdit.tsx'
import { ButtonDeleteDocumentGuideBook } from '../component/buttonDelete.tsx'

export const ColumnsGuideBook = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const Columns: ColumnDef<IGuideBookDocument>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_dokumen',
      header: 'Nama Dokumen',
    },
    {
      accessorKey: 'jenis',
      header: 'Jenis',
    },
    {
      accessorKey: 'key_file',
      header: 'File',
      cell: ({ row }) => {
        if (row.original.jenis === 'URL') {
          return (
            <Link
              to={row?.original?.url ?? '#'}
              target={'_blank'}
              className={
                'text-primary border-primary hover:text-primary rounded text-sm px-2 py-1 flex items-center gap-x-1 border w-fit'
              }
            >
              <FiExternalLink className={'size-4'} />
              Buka URL File
            </Link>
          )
        } else if (row.original.jenis === 'DOKUMEN') {
          return (
            <Link
              to={row?.original?.url ?? '#'}
              target={'_blank'}
              className={
                'text-primary border-primary hover:text-primary rounded text-sm px-2 py-1 flex items-center gap-x-1 border w-fit'
              }
            >
              <FiExternalLink className={'size-4'} />
              Buka Dokumen
            </Link>
          )
        }
      },
    },
    {
      accessorKey: 'public',
      header: 'Status',
      cell: ({ row }) => {
        return <div>{row?.original?.public ? 'Publik' : 'Tidak PUblik'}</div>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex items-center gap-x-2'}>
            <ButtonEditDocumentGuideBook {...row.original} />
            <ButtonDeleteDocumentGuideBook {...row.original} />
          </div>
        )
      },
    },
  ]

  return Columns
}

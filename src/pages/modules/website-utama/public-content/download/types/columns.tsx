import type { ColumnDef } from '@tanstack/react-table'
import type { IDownload } from '@/pages/modules/website-utama/public-content/download/types/index.tsx'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteFileDownload } from '@/pages/modules/website-utama/public-content/download/components/buttonDelete.tsx'
import { IoLanguage } from 'react-icons/io5'

export const DownloadFileColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IDownload>[] = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_berkas',
      header: 'Nama Berkas',
    },
    {
      accessorKey: 'nama_kategori_berkas',
      header: 'Kategori Berkas',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-1.5 justify-between w-full'}>
            <p className="text-primary">{data?.nama_kategori_berkas}</p>
            <Link
              to={`category-language/${data?.id_kategori_berkas}`}
              className={'border border-primary p-1.5 rounded text-primary'}
            >
              <IoLanguage className={'size-4'} />
            </Link>
          </div>
        )
      },
    },
    {
      accessorKey: 'link_drive',
      header: 'Link',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div>
              {data?.is_link_drive ? (
                <Link to={data?.link_drive ?? '#'} target={'_blank'}>
                  <Button>Buka File</Button>
                </Link>
              ) : (
                <Link to={data?.file_url ?? '#'} target={'_blank'}>
                  <Button>Buka File</Button>
                </Link>
              )}
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'download_count',
      header: 'Diunduh',
    },
    {
      accessorKey: 'id_download',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-1.5'}>
            <Link to={`language/${data?.id_download}`} className="flex items-center gap-2">
              <button className={'bg-primary p-1.5 rounded hover:bg-primary text-white'}>
                <IoLanguage />
              </button>
            </Link>
            <Link to={`edit/${data?.id_download}`} className="flex items-center gap-2">
              <button className={'bg-yellow-500 p-1.5 rounded hover:bg-yellow-600 text-white'}>
                <HiPencil />
              </button>
            </Link>
            <ButtonDeleteFileDownload data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}

import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IFacilitiesDetail } from '@/pages/modules/website-utama/public-content/facilities/data'
import { Button } from '@/components/ui/button.tsx'
import { MdInfo, MdOutlineHistory } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteFacilities } from '../../components/buttonDelete.tsx'
import { ButtonSubmissionFacilities } from '../../components/buttonSubmission.tsx'
import { IoLanguage } from 'react-icons/io5'

export const DraftColumnsFacilities = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IFacilitiesDetail>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => `${page * limit - limit + row.index + 1}`,
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => (
        <img
          src={row.original.gambar}
          alt="gambar"
          className={'w-[180px] h-[135px] object-cover'}
        />
      ),
    },
    {
      accessorKey: 'nama_fasilitas',
      header: 'Nama Fasilitas',
    },
    {
      accessorKey: 'alamat',
      header: 'Alamat',
    },
    {
      accessorKey: 'no_hp_pembantu',
      header: 'No. HP',
    },
    {
      accessorKey: 'email_pembantu',
      header: 'Email',
    },
    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link to={`log/${row?.original?.id_fasilitas}`}>
            <Button
              size={'sm'}
              variant={'outline'}
              className={'text-blue-500 border-blue-500 hover:text-blue-500'}
            >
              <MdOutlineHistory />
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
          <>
            <div className={'flex flex-col gap-2 items-center'}>
              <div className="flex items-center gap-1">
                <Link to={`language/${row?.original?.id_fasilitas}`}>
                  <button className={'bg-primary p-1.5 rounded text-white'}>
                    <IoLanguage />
                  </button>
                </Link>
                <Link to={`detail/${row?.original?.id_fasilitas}`}>
                  <button className={'bg-blue-500 p-1.5 rounded text-white hover:bg-blue-600'}>
                    <MdInfo />
                  </button>
                </Link>
                <Link to={`edit/${row?.original?.id_fasilitas}`}>
                  <button className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}>
                    <HiPencil />
                  </button>
                </Link>
                <ButtonDeleteFacilities {...row?.original} />
              </div>
              <ButtonSubmissionFacilities {...row?.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}

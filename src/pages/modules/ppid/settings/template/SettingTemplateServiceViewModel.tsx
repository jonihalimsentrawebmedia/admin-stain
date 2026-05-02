import { Button } from '@/components/ui/button'
import type { ColumnDef } from '@tanstack/react-table'
import { Link, useSearchParams } from 'react-router-dom'
import ButtonSwitch from './components/ButtonSwitch'
import { format } from 'date-fns'
import type { ThemaPPID } from './model'
import { FaGear } from 'react-icons/fa6'
import ButtonEditDescription from '@/pages/modules/ppid/settings/template/components/buttonEdit.tsx'

const SettingTemplateServiceViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<ThemaPPID>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },

    // ✅ Nama Pangkat Golongan
    {
      accessorKey: 'image',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return <img className="w-[344px] h-[258px] object-cover" src={row.original.image} />
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <ButtonSwitch data={row.original} />
      },
    },
    {
      accessorKey: 'tanggal',
      header: 'Tanggal Aktif',
      cell: ({ row }) => {
        return (
          <div>
            <div>{format(row.original.tanggal_aktif, 'd-M-yyyy, HH:mm')}</div>
            <div>(Oleh: {row.original.nama_user_updated ?? '-'})</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'keterangan',
      header: 'Keterangan',
      cell: ({ row }) => {
        const data = row.original
        return <ButtonEditDescription data={data} />
      },
    },
    {
      accessorKey: 'id_template',
      header: 'Pengaturan Warna',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Link to={`${data?.thema}`}>
              <Button
                variant={'outline'}
                className={'border-primary hover:text-primary text-primary'}
              >
                <FaGear />
                Atur Warna
              </Button>
            </Link>
            <p>Warna :{data?.default === 'DEFAULT' ? 'Default' : 'Custom'}</p>
          </>
        )
      },
    },
    // ✅ Aksi (Ikon Edit dan Hapus)
    // {
    //   accessorKey: 'aksi',
    //   header: 'Lihat Demo',
    //   cell: () => {
    //     return (
    //       <Link to={'#'}>
    //         <Button variant={'outline'} className="border-primary text-primary">
    //           <MdOpenInNew />
    //           Demo Template Website
    //         </Button>
    //       </Link>
    //     )
    //   },
    // },
  ]
  return {
    columns,
  }
}

export default SettingTemplateServiceViewModel

import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { AcreditationList } from './model'
import { History } from 'lucide-react'
import ButtonEditAcreditation from './components/ButtonEditAcreditation'
import ButtonDeleteAcreditation from './components/ButtonDeleteAcreditation'

const AcreditationViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
const navigate=useNavigate()
  const columns: ColumnDef<AcreditationList>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <div className="min-w-[120px]">
            <img className="w-[120px] min-w-[120px]  h-[100px]" src={row.original.gambar} />
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_satuan_organisasi',
      header: 'Universitas / Prodi',
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
    },
    {
      accessorKey: 'nilai_akreditasi',
      header: 'Nilai Akreditasi',
    },
    {
      accessorKey: 'lembaga_penilaian',
      header: 'Lembaga Penilai',
    },
    {
      accessorKey: 'no_surat_keputusan',
      header: 'No. Surat Keputusan',
    },
    {
      accessorKey: 'mulai_berlaku',
      header: 'No. Surat Keputusan',
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.original.mulai_berlaku.split('-').reverse().join('-')}
            <br />
            s/d <br />
            {row.original.akhir_berlaku.split('-').reverse().join('-')}
          </div>
        )
      },
    },

    {
      accessorKey: 'log',
      header: 'Log',
      cell: ({ row }) => {
        return (
          <Link
            to={`/modules/website-utama/acreditation/${row.original.id_akreditas}/log`}
            className="border border-[#2769CD] px-4 py-2 text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <History className="text-[#2769CD] size-6" />
            Log
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditAcreditation data={row.original} />
            <ButtonDeleteAcreditation data={row.original} />
            {/* <ButtonEditServices data={row.original} />
            <ButtonDeleteServices data={row.original} /> */}
          </div>
        )
      },
    },
  ]
function goToBackground(){
    navigate('background')
}
  return { columns,goToBackground }
}

export default AcreditationViewModel

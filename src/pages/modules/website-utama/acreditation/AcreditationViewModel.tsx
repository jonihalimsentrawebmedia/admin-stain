import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { AcreditationList } from './model'
import { History } from 'lucide-react'
import ButtonDeleteAcreditation from './components/ButtonDeleteAcreditation'
import { useState } from 'react'
import useGetSatuanOrganisasi from '../../settings/controller/useGetSatuanOrganisasi'
import { IoLanguage } from 'react-icons/io5'
import { HiPencil } from 'react-icons/hi'

export function capitalizeTextSimple(text: string): string {
  if (!text) return ''

  return text
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

type ExpandableTextProps = {
  text: string
}

const ExpandableText = ({ text }: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="min-w-[200px]">
      <p className={`text-sm text-gray-800 leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
        {text}
      </p>

      {text.length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs font-medium text-green-600 hover:underline"
        >
          {expanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}
        </button>
      )}
    </div>
  )
}
const AcreditationViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()
  const { satuanOrganisasi: univ } = useGetSatuanOrganisasi({
    isFilter: true,
    isGetAll: true,
    kelompok: 'UNIVERSITAS',
  })
  const { satuanOrganisasi: prodi } = useGetSatuanOrganisasi({
    isFilter: true,
    isGetAll: true,
    kelompok: 'PRODI',
  })
  const optionsUniv = univ.map((item) => {
    return {
      value: item.id_satuan_organisasi,
      label: item.nama,
    }
  })
  const optionsProd = prodi.map((item) => {
    return {
      value: item.id_satuan_organisasi,
      label: item.nama,
    }
  })
  const optionsJoin = [
    {
      value: '',
      label: 'Semua',
    },
    ...optionsProd,
    ...optionsUniv,
  ]
  const optionsOrganisasiJoin = [...optionsProd, ...optionsUniv]
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
      accessorKey: 'nama_satuan_organisasi_akreditas',
      header: 'Universitas / Prodi',
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
      cell: ({ row }) => {
        return <ExpandableText text={row.original.uraian} />
      },
    },
    {
      accessorKey: 'nilai_akreditas',
      header: 'Nilai Akreditasi',
      cell: ({ row }) => {
        return (
          <div className="capitalize">{capitalizeTextSimple(row.original.nilai_akreditas)}</div>
        )
      },
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
            className="border border-[#2769CD] px-3 py-1.5 w-fit text-[#2769CD] rounded-lg flex gap-2 items-center"
          >
            <History className="size-4" />
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
          <div className="flex flex-col gap-1.5 items-center">
            <Link
              to={`language/${row?.original?.id_akreditas}`}
              className={'bg-primary p-1.5 text-white rounded'}
            >
              <IoLanguage />
            </Link>
            <Link
              to={`edit/${row?.original?.id_akreditas}`}
              className={'bg-yellow-500 p-1.5 text-white rounded hover:bg-yellow-600'}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteAcreditation data={row.original} />
          </div>
        )
      },
    },
  ]

  function goToBackground() {
    navigate('background')
  }

  return { columns, goToBackground, optionsJoin, optionsOrganisasiJoin }
}

export default AcreditationViewModel

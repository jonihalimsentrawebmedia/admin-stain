import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IAccreditation } from './types.ts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import { History } from 'lucide-react'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { clsx } from 'clsx'

export const AccreditationColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const [lineClap, setLineClap] = useState(true)

  const columns: ColumnDef<IAccreditation>[] = [
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
        const data = row?.original
        return (
          <img
            src={data?.gambar}
            alt={data?.nama_satuan_organisasi}
            className="w-[200px] h-[150px] object-cover min-w-[200px]"
          />
        )
      },
    },
    {
      accessorKey: 'nama_satuan_organisasi_akreditas',
      header: 'Universitas / Prodi',
      cell: ({ row }) => {
        return (
          <p className={'lowercase'}>
            {row?.original.nama_satuan_organisasi} /{' '}
            {row?.original.nama_satuan_organisasi_akreditas}
          </p>
        )
      },
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <RenderHTMLContent
              content={data?.uraian ?? ''}
              className={clsx(lineClap && 'line-clamp-3')}
            />
            <button
              onClick={() => setLineClap(!lineClap)}
              className={'text-green-700 underline underline-offset-2'}
            >
              {lineClap ? 'Tampilkan Selengkapnya' : 'Sembunyikan Selengkapnya'}
            </button>
          </>
        )
      },
    },
    {
      accessorKey: 'nilai_akreditas',
      header: 'Nilai Akreditasi',
      cell: ({ row }) => {
        const data = row?.original
        return <p className={'lowercase'}>{data?.nilai_akreditas?.split('_').join(' ')}</p>
      },
    },
    {
      accessorKey: 'lembaga_penilaian',
      header: 'Lembaga Penilaian',
    },
    {
      accessorKey: 'no_surat_keputusan',
      header: 'No Surat Keputusan',
    },
    {
      accessorKey: 'mulai_berlaku',
      header: 'Masa Berlaku',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'text-center'}>
            <p className={'whitespace-nowrap'}>
              {data?.mulai_berlaku
                ? format(new Date(data?.mulai_berlaku), 'dd MMMM yyyy', { locale: id })
                : '-'}
            </p>
            <p>s/d</p>
            <p className={'whitespace-nowrap'}>
              {data?.akhir_berlaku
                ? format(new Date(data?.akhir_berlaku), 'dd MMMM yyyy', { locale: id })
                : '-'}
            </p>
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
            to={`log/${row.original.id_akreditas}`}
            className="border border-[#2769CD] px-4 py-1.5 text-[#2769CD] rounded font-semibold flex gap-2 items-center"
          >
            <History className="text-[#2769CD] size-4" />
            Log
          </Link>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
    },
  ]

  return columns
}

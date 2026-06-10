import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { INUmberLetterAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/data/types.ts'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'
import { HiPencil } from 'react-icons/hi'
import ButtonDeleteNumberLetterAutomatic from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/buttonDelete.tsx'

export const ColumnsCodeNumber = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<INUmberLetterAutomatic>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nama_nomor_surat',
      header: 'Nama Kode Nomor Surat',
    },
    {
      accessorKey: 'id_unit',
      header: 'Satuan Kerja',
      cell: ({ row }) => {
        const data = row.original
        return <p>{data?.nama_unit ?? 'Tidak Dipilih / NULL'}</p>
      },
    },
    {
      accessorKey: 'format_kode_nomor_surat',
      header: 'Format Surat',
      cell: ({ row }) => {
        const data = row?.original
        const result = GenerateLetterCodeNumber({
          kode_depan: data?.kode_depan,
          urutan_kode_depan: data?.urutan_kode_depan,
          kode_belakang: data?.kode_belakang,
          urutan_kode_belakang: data?.urutan_kode_belakang,
          is_bulan: data?.is_perlu_bulan,
          is_bulan_romawi: data?.is_bulan_romawi,
          is_tahun: data?.is_perlu_tahun,
          urutan_bulan: data?.urutan_bulan,
          urutan_nomor_surat: data?.urutan_posisi_utama_no_surat,
          urutan_tahun: data?.urutan_tahun,
        })
        return <div dangerouslySetInnerHTML={{ __html: result ?? '' }} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center gap-1.5">
              <Link to={`edit/${data?.id_nomor_surat_otomatis}`}>
                <button className={'bg-yellow-500 text-white p-1.5 rounded hover:bg-yellow-600'}>
                  <HiPencil />
                </button>
              </Link>
              <ButtonDeleteNumberLetterAutomatic data={data} />
            </div>
          </>
        )
      },
    },
  ]
  return { columns }
}

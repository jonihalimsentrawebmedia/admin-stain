import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import ButtonEdit from './components/ButtonEdit'
import ButtonDelete from './components/ButtonDelete'
import type { LandingList } from './model'
import ButtonSwitch from './components/ButtonSwitch'

const LandingPageViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<LandingList>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'slug',
      header: 'Status Aktif',
      cell: ({ row }) => {
        return <ButtonSwitch data={row.original} />
      },
    },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <>
            {values?.is_content_website_utama ? (
              <p className={'text-primary text-sm font-semibold'}>Konten Website Utama</p>
            ) : (
              <div className="flex gap-2 flex-col items-center">
                <ButtonEdit data={values} />
                <ButtonDelete data={values} />
              </div>
            )}
          </>
        )
      },
    },
  ]
  return {
    columns,
  }
}

export default LandingPageViewModel

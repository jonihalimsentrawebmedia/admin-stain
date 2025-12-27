import { useSearchParams } from 'react-router-dom'
import type { ProvinceList } from './model'
import type { ColumnDef } from '@tanstack/react-table'
import ButtonEditProvince from './components/ButtonEditProvince'
import ButtonDeleteProvince from './components/ButtonDeleteProvince'
import useGetCountry from '../country/controller/useGetCountry'

const ProvinceViewModel = () => {
  const [searchParams] = useSearchParams()
  const { country } = useGetCountry({ isGetAll: true })
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const optionCountry = country.map((item) => {
    return {
      value: item.id_negara,
      label: item.nama_negara,
    }
  })
  const columns: ColumnDef<ProvinceList>[] = [
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
    { accessorKey: 'nama_provinsi', header: 'Nama Provinsi' },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditProvince data={values} optionCountry={optionCountry} />
            <ButtonDeleteProvince data={values} />
          </div>
        )
      },
    },
  ]
  return {
    columns,
    optionCountry,
  }
}

export default ProvinceViewModel

import { GripVertical, Trash2 } from 'lucide-react'

interface IEmployee {
  id_sdm: string | null
  metode_tambah: 'SDM' | 'MANUAL'
  nama_lengkap: string
  satuan_kerja: string
  nip: string
  nik: string
  hp?: string
  alamat: string
  jabatan_pegawai: string
}

interface Props {
  data: IEmployee[]
  onDelete: (index: number) => void
  onChangeJabatan: (index: number, value: string) => void
}

const EmployeeTable = ({ data, onDelete, onChangeJabatan }: Props) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="w-14 p-3" />
            <th className="w-16 p-3 text-left">Urut</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">NIK/NIP</th>
            <th className="p-3 text-left">Satuan Kerja</th>
            <th className="p-3 text-left">Jabatan</th>
            <th className="w-20 p-3" />
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id_sdm ?? `${item.nik}-${index}`} className="border-t">
              <td className="p-2">
                <div className="flex justify-center">
                  <button type="button" className="rounded-lg bg-violet-100 p-2">
                    <GripVertical className="h-4 w-4" />
                  </button>
                </div>
              </td>

              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium">{item.nama_lengkap}</td>
              <td className="p-3">{item.nik || item.nip}</td>
              <td className="max-w-xs p-3">{item.satuan_kerja}</td>
              <td className="p-3">
                <input
                  value={item.jabatan_pegawai}
                  onChange={(e) => onChangeJabatan(index, e.target.value)}
                  placeholder="Masukkan Jabatan"
                  className="w-full rounded-md border px-3 py-2"
                />
              </td>
              <td className="p-3">
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="rounded-lg bg-red-500 p-2 text-white"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable

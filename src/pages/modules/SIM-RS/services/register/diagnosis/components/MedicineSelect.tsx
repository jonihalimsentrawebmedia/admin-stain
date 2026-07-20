import { useMemo, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import { Input } from '@/components/ui/input.tsx'
import { BiSearch } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { UseGetMedicine } from '@/pages/modules/SIM-RS/pharmacy/medicine/hooks/index.tsx'
import type { IMedicine } from '@/pages/modules/SIM-RS/pharmacy/medicine/data/types.ts'
import type { TResolverDiagnosis } from '../data/resolver.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx'
import { MdInfo } from 'react-icons/md'

interface Props {
  form: UseFormReturn<TResolverDiagnosis>
}

export const MedicineSelect = ({ form }: Props) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const daftarResepObat = form.watch('daftar_resep_obat') ?? []

  const { medicine, loading } = UseGetMedicine({ page: '1', limit: '50', search })

  const handleAddMedicine = (item: IMedicine) => {
    const exists = daftarResepObat.some((r) => r.id_obat === item.id_obat)
    if (exists) return
    form.setValue('daftar_resep_obat', [
      ...daftarResepObat,
      {
        id_obat: item.id_obat,
        nama_obat: item.nama_obat,
        satuan: item.satuan,
        harga: item.harga,
        frekuensi: 1,
        durasi: 1,
        jumlah: 1,
      },
    ])
    setOpen(false)
    setSearch('')
  }

  const handleRemove = (index: number) => {
    const updated = daftarResepObat.filter((_, i) => i !== index)
    form.setValue('daftar_resep_obat', updated)
  }

  const handleFieldChange = (
    index: number,
    field: 'frekuensi' | 'durasi' | 'jumlah',
    value: string
  ) => {
    const num = parseInt(value) || 0
    const updated = daftarResepObat.map((item, i) =>
      i === index ? { ...item, [field]: num } : item
    )
    form.setValue('daftar_resep_obat', updated)
  }

  const dialogColumns: ColumnDef<IMedicine>[] = useMemo(
    () => [
      { accessorKey: 'nama_obat', header: 'Nama Obat' },
      { accessorKey: 'satuan', header: 'Satuan' },
      {
        accessorKey: 'harga',
        header: 'Harga',
        cell: ({ row }) =>
          new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
            row.original.harga
          ),
      },
      {
        accessorKey: 'action',
        header: '',
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => handleAddMedicine(row.original)}
            className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/80"
          >
            Pilih
          </button>
        ),
      },
    ],
    [daftarResepObat]
  )

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val)

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded text-sm bg-primary text-white hover:bg-primary/80 self-start"
        >
          Tambah Obat
        </button>

        {daftarResepObat.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left w-10">#</th>
                  <th className="border px-3 py-2 text-left">Nama Obat</th>
                  <th className="border px-3 py-2 text-left">Satuan</th>
                  <th className="border px-3 py-2 text-right">Harga</th>
                  <th className="border px-3 py-2 text-center">
                    <div className="flex items-center gap-1">
                      <p>Frekuensi</p>
                      <Tooltip>
                        <TooltipTrigger>
                          <MdInfo className={'size-4 text-primary'} />
                        </TooltipTrigger>
                        <TooltipContent>
                          Masukkan aturan frekuensi penggunaan obat. Contoh: 3x sehari, 2x sehari,
                          atau 1x sebelum tidur
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>
                  <th className="border px-3 py-2 text-center">
                    <div className="flex items-center gap-1">
                      <p>Durasi</p>
                      <Tooltip>
                        <TooltipTrigger>
                          <MdInfo className={'size-4 text-primary'} />
                        </TooltipTrigger>
                        <TooltipContent>
                          Masukkan lama penggunaan obat. Contoh: 5 hari, 7 hari, atau Sampai Habis.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>
                  <th className="border px-3 py-2 text-center">
                    <div className="flex items-center gap-1">
                      <p>Jumlah</p>
                      <Tooltip>
                        <TooltipTrigger>
                          <MdInfo className={'size-4 text-primary'} />
                        </TooltipTrigger>
                        <TooltipContent>
                          Masukkan total obat yang diberikan kepada pasien. Nilai ini digunakan
                          untuk menghitung total biaya obat.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>
                  <th className="border px-3 py-2 text-right">Harga Total</th>
                  <th className="border px-3 py-2 text-center w-12">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {daftarResepObat.map((item, index) => (
                  <tr key={item.id_obat} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2">{item.nama_obat}</td>
                    <td className="border px-3 py-2">{item.satuan}</td>
                    <td className="border px-3 py-2 text-right">{formatRupiah(item.harga)}</td>
                    <td className="border px-3 py-2 text-center">
                      <Input
                        type="number"
                        min={1}
                        value={item.frekuensi}
                        onChange={(e) => handleFieldChange(index, 'frekuensi', e.target.value)}
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Input
                        type="number"
                        min={1}
                        value={item.durasi}
                        onChange={(e) => handleFieldChange(index, 'durasi', e.target.value)}
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Input
                        type="number"
                        min={1}
                        value={item.jumlah}
                        onChange={(e) => handleFieldChange(index, 'jumlah', e.target.value)}
                        className="w-20 text-center"
                      />
                    </td>
                    <td className="border px-3 py-2 text-right font-medium">
                      {formatRupiah(item.harga * item.jumlah)}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded"
                      >
                        <FaTrash className="size-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DialogBasic open={open} setOpen={setOpen} title="Pilih Obat" className="sm:min-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <BiSearch className="text-gray-400 size-5" />
          <Input
            placeholder="Cari nama obat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white"
          />
        </div>
        <TableCustom
          data={medicine}
          columns={dialogColumns}
          loading={loading}
          isShowPagination={false}
          isShowFilter={false}
        />
      </DialogBasic>
    </>
  )
}

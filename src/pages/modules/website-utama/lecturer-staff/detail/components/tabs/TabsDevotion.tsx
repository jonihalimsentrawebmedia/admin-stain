'use client'

import { useState } from 'react'
import { Pencil, Save, Trash2, Plus, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table'

type PengabdianType = {
  id: number
  judul_pengabdian: string
  tahun_pelaksanaan: string
  lama_kegiatan: string
  isEditing?: boolean
}

export default function TabsDevotion() {
  const [data, setData] = useState<PengabdianType[]>([
    {
      id: 1,
      judul_pengabdian:
        'Sosialisasi Penggunaan Platform PPDB Online bagi Operator Sekolah Tingkat Distrik',
      tahun_pelaksanaan: '2026',
      lama_kegiatan: '3 Bulan',
      isEditing: false,
    },
    {
      id: 2,
      judul_pengabdian:
        'Workshop Literasi Digital dan Keamanan Data bagi Tenaga Kependidikan STAIN Madina',
      tahun_pelaksanaan: '2024',
      lama_kegiatan: '1 Bulan',
      isEditing: true,
    },
  ])

  const [newRow, setNewRow] = useState({
    judul_pengabdian: '',
    tahun_pelaksanaan: '',
    lama_kegiatan: '',
  })

  const handleEdit = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isEditing: !item.isEditing,
            }
          : item
      )
    )
  }

  const handleChange = (id: number, field: keyof PengabdianType, value: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    )
  }

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAdd = () => {
    // if (!newRow.judul_pengabdian) return;

    setData((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newRow,
        isEditing: false,
      },
    ])

    setNewRow({
      judul_pengabdian: '',
      tahun_pelaksanaan: '',
      lama_kegiatan: '',
    })
  }

  const handleSync = () => {
    alert('Sinkronisasi SISTER berhasil')
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl  font-medium text-primary">Pengabdian</h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-primary hover:text-primary text-primary"
            onClick={handleSync}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sinkronisasi SISTER
          </Button>
          <Button
            onClick={() => {
              handleAdd()
            }}
            variant={'outline'}
            className="border-primary text-primary hover:text-primary"
          >
            <Plus />
            Tambah
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-50">
              <TableHead className="text-primary">#</TableHead>

              <TableHead className="text-primary">Judul Pengabdian</TableHead>

              <TableHead className="text-primary">Tahun Pelaksanaan</TableHead>

              <TableHead className="text-primary">Lama Kegiatan</TableHead>

              <TableHead className="text-primary"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                {/* Number */}
                <TableCell className="text-black whitespace-pre-line">{index + 1}</TableCell>

                {/* Judul */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      value={item.judul_pengabdian}
                      onChange={(e) => handleChange(item.id, 'judul_pengabdian', e.target.value)}
                    />
                  ) : (
                    item.judul_pengabdian
                  )}
                </TableCell>

                {/* Tahun */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      type="number"
                      value={item.tahun_pelaksanaan}
                      onChange={(e) => handleChange(item.id, 'tahun_pelaksanaan', e.target.value)}
                    />
                  ) : (
                    item.tahun_pelaksanaan
                  )}
                </TableCell>

                {/* Lama Kegiatan */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      value={item.lama_kegiatan}
                      onChange={(e) => handleChange(item.id, 'lama_kegiatan', e.target.value)}
                    />
                  ) : (
                    item.lama_kegiatan
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-black whitespace-pre-line">
                  <div className="flex gap-2">
                    {item.isEditing ? (
                      <Button
                        size="icon"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleEdit(item.id)}
                      >
                        <Save size={16} />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        className="bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => handleEdit(item.id)}
                      >
                        <Pencil size={16} />
                      </Button>
                    )}

                    <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {/* Add New Row */}
            <TableRow>
              <TableCell className="text-black whitespace-pre-line">{data.length + 1}</TableCell>

              <TableCell className="text-black whitespace-pre-line">
                <Input
                  placeholder="Judul Pengabdian"
                  value={newRow.judul_pengabdian}
                  onChange={(e) =>
                    setNewRow({
                      ...newRow,
                      judul_pengabdian: e.target.value,
                    })
                  }
                />
              </TableCell>

              <TableCell className="text-black whitespace-pre-line">
                <Input
                  type="number"
                  placeholder="Tahun Pelaksanaan"
                  value={newRow.tahun_pelaksanaan}
                  onChange={(e) =>
                    setNewRow({
                      ...newRow,
                      tahun_pelaksanaan: e.target.value,
                    })
                  }
                />
              </TableCell>

              <TableCell className="text-black whitespace-pre-line">
                <Input
                  placeholder="Lama Kegiatan (contoh: 3 Bulan)"
                  value={newRow.lama_kegiatan}
                  onChange={(e) =>
                    setNewRow({
                      ...newRow,
                      lama_kegiatan: e.target.value,
                    })
                  }
                />
              </TableCell>

              <TableCell className="text-black whitespace-pre-line">
                <Button size="icon" className="bg-green-500 hover:bg-green-600" onClick={handleAdd}>
                  <Save size={16} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

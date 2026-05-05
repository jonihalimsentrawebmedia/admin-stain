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

type HKIPatenType = {
  id: number
  judul_hki_paten: string
  jenis_hki_paten: string
  tanggal_terbit: string
  isEditing?: boolean
}

export default function TabsHKI() {
  const [data, setData] = useState<HKIPatenType[]>([
    {
      id: 1,
      judul_hki_paten: 'Sistem UI Kit "Madina Design System" untuk Standardisasi Platform Kampus',
      jenis_hki_paten: 'Hak Cipta',
      tanggal_terbit: '2026-04-04',
      isEditing: false,
    },
    {
      id: 2,
      judul_hki_paten: 'Modul Antarmuka Pengguna untuk Aplikasi PPDB Online Tingkat Distrik',
      jenis_hki_paten: 'Hak Cipta',
      tanggal_terbit: '2022-04-04',
      isEditing: true,
    },
  ])

  const [newRow, setNewRow] = useState({
    judul_hki_paten: '',
    jenis_hki_paten: '',
    tanggal_terbit: '',
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

  const handleChange = (id: number, field: keyof HKIPatenType, value: string) => {
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
    // if (!newRow.judul_hki_paten) return;

    setData((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newRow,
        isEditing: false,
      },
    ])

    setNewRow({
      judul_hki_paten: '',
      jenis_hki_paten: '',
      tanggal_terbit: '',
    })
  }

  const handleSync = () => {
    alert('Sinkronisasi SISTER berhasil')
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">HKI/PATEN</h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-primary text-primary hover:text-primary"
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

              <TableHead className="text-primary">Judul HKI/PATEN</TableHead>

              <TableHead className="text-primary">Jenis HKI/PATEN</TableHead>

              <TableHead className="text-primary">Tanggal Terbit</TableHead>

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
                      value={item.judul_hki_paten}
                      onChange={(e) => handleChange(item.id, 'judul_hki_paten', e.target.value)}
                    />
                  ) : (
                    item.judul_hki_paten
                  )}
                </TableCell>

                {/* Jenis */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      value={item.jenis_hki_paten}
                      onChange={(e) => handleChange(item.id, 'jenis_hki_paten', e.target.value)}
                    />
                  ) : (
                    item.jenis_hki_paten
                  )}
                </TableCell>

                {/* Date */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      type="date"
                      value={item.tanggal_terbit}
                      onChange={(e) => handleChange(item.id, 'tanggal_terbit', e.target.value)}
                    />
                  ) : (
                    item.tanggal_terbit
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
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

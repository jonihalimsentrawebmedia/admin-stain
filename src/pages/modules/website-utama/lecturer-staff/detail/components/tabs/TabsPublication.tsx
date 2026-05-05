'use client'

import { useState } from 'react'
import { Pencil, Save, Trash2, Plus, RefreshCw, ExternalLink } from 'lucide-react'

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

type PublikasiType = {
  id: number
  judul_publikasi: string
  jenis_publikasi: string
  tanggal_terbit: string
  url_jurnal: string
  isEditing?: boolean
}

export default function TabsPublication() {
  const [data, setData] = useState<PublikasiType[]>([
    {
      id: 1,
      judul_publikasi: 'Integrasi Design System pada Platform Layanan Publik Digital',
      jenis_publikasi: 'Jurnal Nasional Terakreditasi',
      tanggal_terbit: '2026-04-04',
      url_jurnal: 'https://jurnal-demo.com',
      isEditing: false,
    },
    {
      id: 2,
      judul_publikasi:
        'Analisis User Experience pada Sistem Pendaftaran Siswa Baru di Kabupaten Labuhanbatu Selatan',
      jenis_publikasi: 'Jurnal Nasional Terakreditasi',
      tanggal_terbit: '2024-04-04',
      url_jurnal: 'https://jurnal.oo.id/acsdaceqw123123',
      isEditing: true,
    },
  ])

  const [newRow, setNewRow] = useState({
    judul_publikasi: '',
    jenis_publikasi: '',
    tanggal_terbit: '',
    url_jurnal: '',
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

  const handleChange = (id: number, field: keyof PublikasiType, value: string) => {
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
    // if (!newRow.judul_publikasi) return;

    setData((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newRow,
        isEditing: false,
      },
    ])

    setNewRow({
      judul_publikasi: '',
      jenis_publikasi: '',
      tanggal_terbit: '',
      url_jurnal: '',
    })
  }

  const handleSync = () => {
    alert('Sinkronisasi SISTER berhasil')
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-primary">Publikasi</h2>

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

              <TableHead className="text-primary">Judul Publikasi</TableHead>

              <TableHead className="text-primary">Jenis Publikasi</TableHead>

              <TableHead className="text-primary">Tanggal Terbit</TableHead>

              <TableHead className="text-primary">URL Jurnal</TableHead>

              <TableHead className="text-primary"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-black whitespace-pre-line">{index + 1}</TableCell>

                {/* Judul */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      value={item.judul_publikasi}
                      onChange={(e) => handleChange(item.id, 'judul_publikasi', e.target.value)}
                    />
                  ) : (
                    item.judul_publikasi
                  )}
                </TableCell>

                {/* Jenis */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      value={item.jenis_publikasi}
                      onChange={(e) => handleChange(item.id, 'jenis_publikasi', e.target.value)}
                    />
                  ) : (
                    item.jenis_publikasi
                  )}
                </TableCell>

                {/* Tanggal */}
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

                {/* URL */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      className="focus-visible:ring-0 rounded"
                      value={item.url_jurnal}
                      onChange={(e) => handleChange(item.id, 'url_jurnal', e.target.value)}
                    />
                  ) : (
                    <a href={item.url_jurnal} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-green-600">
                        Buka Jurnal
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </a>
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

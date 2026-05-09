'use client'

import { useEffect, useState } from 'react'
import { Pencil, Save, Trash2, Plus,  } from 'lucide-react'

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
import { useParams } from 'react-router-dom'
import { UseGetPublication } from '../../hooks'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ButtonSyncLecturerDetail } from '../ButtonSyncDetail'

type PublikasiType = {
  id: string
  judul_publikasi: string
  jenis_publikasi: string
  tanggal_terbit: string
  url_jurnal: string
  isEditing?: boolean
  isAdd?: boolean
}

export default function TabsPublication() {
  const { id } = useParams()
  const { publication } = UseGetPublication({
    id_sdm: id,
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PublikasiType[]>([])

  const [newRow, setNewRow] = useState({
    judul_publikasi: '',
    jenis_publikasi: '',
    tanggal_terbit: '',
    url_jurnal: '',
  })
  const temp = [...data]
  const queryClient = useQueryClient()
  async function handleSaveAdd(values: PublikasiType) {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id}/publikasi`, {
      judul_publikasi: values.judul_publikasi,
      jenis_publikasi: values.jenis_publikasi,
      tanggal_terbit: values.tanggal_terbit,
      url_jurnal: values.url_jurnal,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['publication'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function handleSaveEdit(values: PublikasiType) {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${id}/publikasi/${values.id}`, {
      judul_publikasi: values.judul_publikasi,
      jenis_publikasi: values.jenis_publikasi,
      tanggal_terbit: values.tanggal_terbit,
      url_jurnal: values.url_jurnal,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['publication'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const handleDelete = async (values: PublikasiType) => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id}/publikasi/${values.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['publication'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  const handleAdd = () => {
    // if (!newRow.judul_publikasi) return;

    setData((prev) => [
      ...prev,
      {
        id: '',
        ...newRow,
        isEditing: true,
        isAdd: true,
      },
    ])

    setNewRow({
      judul_publikasi: '',
      jenis_publikasi: '',
      tanggal_terbit: '',
      url_jurnal: '',
    })
  }

 

  useEffect(() => {
    if (publication) {
      const temp = publication.map((item) => {
        return {
          judul_publikasi: item.judul_publikasi,
          jenis_publikasi: item.jenis_publikasi,
          tanggal_terbit: item.tanggal_terbit,
          url_jurnal: item.url_jurnal,
          id: item.id_publikasi,
          isEditing: false,
        }
      })
      setData(temp)
    }
  }, [publication])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-primary">Publikasi</h2>

        <div className="flex gap-2">
          <ButtonSyncLecturerDetail
            link={`/website-utama/sdm/${id}/publikasi/sync`}
            topik="fcm_sync_sdm_publikasi"
          />

          <Button
            disabled={loading}
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
                      placeholder="Judul Publikasi"
                      className="focus-visible:ring-0 rounded"
                      value={item.judul_publikasi}
                      onChange={(e) => {
                        temp[index].judul_publikasi = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    item.judul_publikasi
                  )}
                </TableCell>

                {/* Jenis */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      placeholder="Jenis Publikasi"
                      className="focus-visible:ring-0 rounded"
                      value={item.jenis_publikasi}
                      onChange={(e) => {
                        temp[index].jenis_publikasi = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    item.jenis_publikasi
                  )}
                </TableCell>

                {/* Tanggal */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      placeholder="dd-mm-yyyy"
                      className="focus-visible:ring-0 rounded"
                      type="date"
                      value={item.tanggal_terbit}
                      onChange={(e) => {
                        temp[index].tanggal_terbit = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    format(new Date(item.tanggal_terbit), 'dd-MM-yyyy')
                  )}
                </TableCell>

                {/* URL */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      type="url"
                      className="focus-visible:ring-0 rounded"
                      value={item.url_jurnal}
                      onChange={(e) => {
                        temp[index].url_jurnal = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    <a href={item.url_jurnal} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-primary hover:text-primary">
                        Buka Jurnal
                      </Button>
                    </a>
                  )}
                </TableCell>

                <TableCell className="text-black whitespace-pre-line">
                  <div className="flex gap-2">
                    {item.isEditing ? (
                      <Button
                        disabled={loading}
                        size="icon"
                        className="bg-green-600"
                        onClick={() => {
                          if (item.isAdd) {
                            handleSaveAdd(item)
                          } else {
                            handleSaveEdit(item)
                          }
                        }}
                      >
                        <Save size={16} />
                      </Button>
                    ) : (
                      <Button
                        disabled={loading}
                        size="icon"
                        className="bg-yellow-500"
                        onClick={() => {
                          temp[index].isEditing = true
                          setData(temp)
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                    )}

                    <Button
                      size="icon"
                      disabled={loading}
                      variant="destructive"
                      onClick={() => {
                        if (item.isAdd) {
                          temp.splice(index, 1)
                          setData(temp)
                        } else {
                          handleDelete(item)
                        }
                      }}
                    >
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

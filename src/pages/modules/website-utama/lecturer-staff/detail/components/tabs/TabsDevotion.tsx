'use client'

import { useEffect, useState } from 'react'
import { Pencil, Plus, Save, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useParams } from 'react-router-dom'
import { UseGetDevotion } from '../../hooks'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ButtonSyncLecturerDetail } from '../ButtonSyncDetail'

type PengabdianType = {
  id: string
  judul_pengabdian: string
  tahun_pelaksanaan: string
  lama_kegiatan: string
  isEditing?: boolean
  isAdd?: boolean
}

interface props {
  show: boolean
}

export default function TabsDevotion(props: props) {
  const { show } = props
  const { id } = useParams()
  const { devotion } = UseGetDevotion({
    id_sdm: id,
  })
  const [data, setData] = useState<PengabdianType[]>([])
  const [loading, setLoading] = useState(false)
  const [newRow, setNewRow] = useState({
    judul_pengabdian: '',
    tahun_pelaksanaan: '',
    lama_kegiatan: '',
  })

  const handleAdd = () => {
    // if (!newRow.judul_pengabdian) return;

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
      judul_pengabdian: '',
      tahun_pelaksanaan: '',
      lama_kegiatan: '',
    })
  }

  const temp = [...data]
  const queryClient = useQueryClient()
  async function handleSaveAdd(values: PengabdianType) {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id}/pengabdian`, {
      judul_pengabdian: values.judul_pengabdian,
      tahun_pelaksanaan: values.tahun_pelaksanaan,
      lama_kegiatan: values.lama_kegiatan,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['devotion'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function handleSaveEdit(values: PengabdianType) {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${id}/pengabdian/${values.id}`, {
      judul_pengabdian: values.judul_pengabdian,
      tahun_pelaksanaan: values.tahun_pelaksanaan,
      lama_kegiatan: values.lama_kegiatan,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['devotion'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const handleDelete = async (values: PengabdianType) => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id}/pengabdian/${values.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['devotion'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  useEffect(() => {
    if (devotion) {
      const temp = devotion.map((item) => {
        return {
          judul_pengabdian: item.judul_pengabdian,
          tahun_pelaksanaan: item.tahun_pelaksanaan,
          lama_kegiatan: item.lama_kegiatan,
          isEditing: false,
          id: item.id_pengabdian,
        }
      })
      setData(temp)
    }
  }, [devotion])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl  font-medium text-primary">Pengabdian</h2>

        <div className="flex gap-2">
          {show && (
            <ButtonSyncLecturerDetail
              link={`/website-utama/sdm/${id}/pengabdian/sync`}
              topik="fcm_sync_sdm_pengabdian"
            />
          )}
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
                      placeholder="Judul Pengabdian"
                      className="focus-visible:ring-0 rounded"
                      value={item.judul_pengabdian}
                      onChange={(e) => {
                        temp[index].judul_pengabdian = e.target.value
                        setData(temp)
                      }}
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
                      placeholder="Tahun Pelaksanaan"
                      value={item.tahun_pelaksanaan}
                      onChange={(e) => {
                        temp[index].tahun_pelaksanaan = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    item.tahun_pelaksanaan
                  )}
                </TableCell>

                {/* Lama Kegiatan */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      placeholder="Lama Kegiatan. Cth: 3 Bulan, 3 Tahun."
                      className="focus-visible:ring-0 rounded"
                      value={item.lama_kegiatan}
                      onChange={(e) => {
                        temp[index].lama_kegiatan = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    item.lama_kegiatan
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

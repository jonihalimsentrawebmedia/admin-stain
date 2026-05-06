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
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useParams } from 'react-router-dom'
import { UseGetHKI } from '../../hooks'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ButtonSyncLecturerDetail } from '../ButtonSyncDetail'

type HKIPatenType = {
  id: string
  judul: string
  jenis_publikasi: string
  tanggal_terbit: string
  isEditing?: boolean
  isAdd?: boolean
}

export default function TabsHKI() {
  const { id } = useParams()
  const { HKI } = UseGetHKI({
    id_sdm: id,
  })
  const [data, setData] = useState<HKIPatenType[]>([])

  const [newRow, setNewRow] = useState({
    judul: '',
    jenis_publikasi: '',
    tanggal_terbit: '',
  })
  const [loading, setLoading] = useState(false)

  const handleAdd = () => {
    // if (!newRow.judul) return;

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
      judul: '',
      jenis_publikasi: '',
      tanggal_terbit: '',
    })
  }

  const temp = [...data]
  const queryClient = useQueryClient()
  async function handleSaveAdd(values: HKIPatenType) {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id}/hki-paten`, {
      judul: values.judul,
      jenis_publikasi: values.jenis_publikasi,
      tanggal_terbit: values.tanggal_terbit,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['hki-paten'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function handleSaveEdit(values: HKIPatenType) {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${id}/hki-paten/${values.id}`, {
      judul: values.judul,
      jenis_publikasi: values.jenis_publikasi,
      tanggal_terbit: values.tanggal_terbit,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['hki-paten'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const handleDelete = async (values: HKIPatenType) => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id}/hki-paten/${values.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['hki-paten'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }



  useEffect(() => {
    if (HKI) {
      const temp = HKI.map((item) => {
        return {
          judul: item.judul,
          jenis_publikasi: item.jenis_publikasi,
          tanggal_terbit: item.tanggal_terbit,
          isEditing: false,
          id: item.id_hki_paten,
        }
      })
      setData(temp)
    }
  }, [HKI])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">HKI/PATEN</h2>

        <div className="flex gap-2">
          <ButtonSyncLecturerDetail
            link={`/website-utama/sdm/${id}/hki-paten/sync`}
            topik="fcm_sync_sdm_hki_paten"
          />

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
                      placeholder="Judul HKI/PATEN"
                      className="focus-visible:ring-0 rounded"
                      value={item.judul}
                      onChange={(e) => {
                        temp[index].judul = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    item.judul
                  )}
                </TableCell>

                {/* Jenis */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      placeholder="Jenis HKI/PATEN"
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

                {/* Date */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
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

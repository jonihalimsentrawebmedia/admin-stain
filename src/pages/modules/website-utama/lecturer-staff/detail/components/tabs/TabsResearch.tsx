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
import { UseGetReseacrh } from '../../hooks'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { ButtonSyncLecturerDetail } from '../ButtonSyncDetail'

type PenelitianType = {
  id: string
  judul_penelitian: string
  tahun_pelaksanaan: string
  isEditing?: boolean
  isAdd?: boolean
  penulis: Array<{
    id_penulis: string
    nama_penulis: string
  }>
}

export default function TabsResearch() {
  const { id } = useParams()
  const { research } = UseGetReseacrh({
    id_sdm: id,
  })
  const [data, setData] = useState<PenelitianType[]>([])

  const [newRow, setNewRow] = useState({
    judul_penelitian: '',
    tahun_pelaksanaan: '',
  })
  const [loading, setLoading] = useState(false)

  const handleAdd = () => {
    setData((prev) => [
      ...prev,
      {
        id: '',
        ...newRow,
        isEditing: true,
        isAdd: true,
        penulis: [],
      },
    ])
    setNewRow({
      judul_penelitian: '',
      tahun_pelaksanaan: '',
    })
  }
  const temp = [...data]
  const queryClient = useQueryClient()
  async function handleSaveAdd(values: PenelitianType) {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id}/penelitian`, {
      judul_penelitian: values.judul_penelitian,
      tahun_pelaksanaan: values.tahun_pelaksanaan,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['research'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function handleSaveEdit(values: PenelitianType) {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${id}/penelitian/${values.id}`, {
      judul_penelitian: values.judul_penelitian,
      tahun_pelaksanaan: values.tahun_pelaksanaan,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['research'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const handleDelete = async (values: PenelitianType) => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id}/penelitian/${values.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['research'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  useEffect(() => {
    if (research) {
      const temp = research.map((item) => {
        return {
          judul_penelitian: item.judul_penelitian,
          tahun_pelaksanaan: item.tahun_pelaksanaan,
          id: item.id_penelitian,
          penulis: item.penulis,
        }
      })
      setData(temp)
    }
  }, [research])

  return (
    <div className=" space-y-4 rounded-md bg-white">
      <div className="flex gap-4 items-center justify-between">
        <div className="text-xl text-primary font-medium">Penelitian</div>
        <div className="flex gap-4 items-center">
          <ButtonSyncLecturerDetail
            link={`/website-utama/sdm/${id}/penelitian/sync`}
            topik="fcm_sync_sdm_penelitian"
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
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow className="bg-green-50">
            <TableHead className="text-primary">#</TableHead>

            <TableHead className="text-primary">Judul Penelitian</TableHead>

            <TableHead className="text-primary">Tahun Pelaksanaan</TableHead>

            <TableHead className="text-primary"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              {/* No */}
              <TableCell className="text-black whitespace-pre-line">{index + 1}</TableCell>

              {/* Judul */}
              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Judul Penelitian"
                    className="focus-visible:ring-0 rounded"
                    value={item.judul_penelitian}
                    onChange={(e) => {
                      temp[index].judul_penelitian = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  <div className={'flex flex-col gap2'}>
                    <p>{item.judul_penelitian}</p>
                    <p>{item?.penulis?.map((row) => row?.nama_penulis).join(', ')}</p>
                  </div>
                )}
              </TableCell>

              {/* Tahun */}
              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Tahun"
                    className="focus-visible:ring-0 rounded"
                    type="number"
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

              {/* Actions */}
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
  )
}

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
import { UseGetRank } from '../../hooks'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ButtonSyncLecturerDetail } from '../ButtonSyncDetail'

type KepangkatanType = {
  id: string
  golongan_pangkat: string
  no_sk: string
  tanggal_mulai: string
  isEditing?: boolean
  isAdd?: boolean
}

interface props {
  show: boolean
}

export default function TabsRank(props: props) {
  const { show } = props
  const { id } = useParams()
  const { rank } = UseGetRank({
    id_sdm: id,
  })
  const [data, setData] = useState<KepangkatanType[]>([])
  const [loading, setLoading] = useState(false)
  const [newRow, setNewRow] = useState({
    golongan_pangkat: '',
    no_sk: '',
    tanggal_mulai: '',
  })
  const temp = [...data]
  const queryClient = useQueryClient()
  async function handleSaveAdd(values: KepangkatanType) {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id}/kepangkatan`, {
      golongan_pangkat: values.golongan_pangkat,
      no_sk: values.no_sk,
      tanggal_mulai: values.tanggal_mulai,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['rank'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function handleSaveEdit(values: KepangkatanType) {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${id}/kepangkatan/${values.id}`, {
      golongan_pangkat: values.golongan_pangkat,
      no_sk: values.no_sk,
      tanggal_mulai: values.tanggal_mulai,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['rank'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const handleDelete = async (values: KepangkatanType) => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id}/kepangkatan/${values.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['rank'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  // Add row
  const handleAdd = () => {
    // if (!newRow.golongan_pangkat) return;

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
      golongan_pangkat: '',
      no_sk: '',
      tanggal_mulai: '',
    })
  }

  // Dummy sync

  useEffect(() => {
    if (rank) {
      const temp = rank.map((item) => {
        return {
          id: item.id_kepangkatan,
          golongan_pangkat: item.golongan_pangkat,
          no_sk: item.no_sk,
          tanggal_mulai: item.tanggal_mulai,
          isEdit: false,
        }
      })
      setData(temp)
    }
  }, [rank])
  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Kepangkatan</h2>

        <div className="flex gap-2">
          {show && (
            <ButtonSyncLecturerDetail
              link={`/website-utama/sdm/${id}/kepangkatan/sync`}
              topik="fcm_sync_sdm_kepangkatan"
            />
          )}

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
              <TableHead className="text-primary">Gol. / Pangkat</TableHead>
              <TableHead className="text-primary">No. SK</TableHead>
              <TableHead className="text-primary">Terhitung Mulai Tanggal</TableHead>
              <TableHead className="text-primary"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-black whitespace-pre-line">{index + 1}</TableCell>

                {/* Golongan */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      placeholder="Gol/ Pangkat"
                      className="focus-visible:ring-0 rounded"
                      value={item.golongan_pangkat}
                      onChange={(e) => {
                        temp[index].golongan_pangkat = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    item.golongan_pangkat
                  )}
                </TableCell>

                {/* No SK */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      placeholder="No. SK"
                      className="focus-visible:ring-0 rounded"
                      value={item.no_sk}
                      onChange={(e) => {
                        temp[index].no_sk = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    item.no_sk
                  )}
                </TableCell>

                {/* Tanggal */}
                <TableCell className="text-black whitespace-pre-line">
                  {item.isEditing ? (
                    <Input
                      placeholder="dd-mm-yyyy"
                      className="focus-visible:ring-0 rounded"
                      type="date"
                      value={item.tanggal_mulai}
                      onChange={(e) => {
                        temp[index].tanggal_mulai = e.target.value
                        setData(temp)
                      }}
                    />
                  ) : (
                    format(new Date(item.tanggal_mulai), 'dd-MM-yyyy')
                  )}
                </TableCell>

                {/* Action */}
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

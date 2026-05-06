'use client'

import { useEffect, useState } from 'react'
import { Pencil, Plus, Save, Trash2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { UseGetFunctionalPosition } from '../../hooks'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ButtonSyncLecturerDetail } from '../ButtonSyncDetail'

type JabatanFungsionalType = {
  id: string
  jabatan_fungsional: string
  no_sk: string
  terhitung_mulai: string
  isEditing?: boolean
  isAdd?: boolean
}

export default function TabsFunctionalPosition() {
  const { id } = useParams()
  const { functionalPosition } = UseGetFunctionalPosition({
    id_sdm: id,
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<JabatanFungsionalType[]>([])
  const temp = [...data]
  const [newRow, setNewRow] = useState({
    jabatan_fungsional: '',
    no_sk: '',
    terhitung_mulai: '',
  })
  const queryClient = useQueryClient()
  async function handleSaveAdd(values: JabatanFungsionalType) {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id}/jabatan-fungsional`, {
      jabatan_fungsional: values.jabatan_fungsional,
      no_sk: values.no_sk,
      terhitung_mulai: values.terhitung_mulai,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['function-position'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function handleSaveEdit(values: JabatanFungsionalType) {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${id}/jabatan-fungsional/${values.id}`, {
      jabatan_fungsional: values.jabatan_fungsional,
      no_sk: values.no_sk,
      terhitung_mulai: values.terhitung_mulai,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['function-position'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const handleDelete = async (values: JabatanFungsionalType) => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id}/jabatan-fungsional/${values.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['function-position'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  const handleAdd = () => {
    // if (!newRow.jabatan_fungsional) return

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
      jabatan_fungsional: '',
      no_sk: '',
      terhitung_mulai: '',
    })
  }
  useEffect(() => {
    if (functionalPosition) {
      const temp = functionalPosition.map((item) => {
        return {
          id: item.id_jabatan_fungsional,
          jabatan_fungsional: item.jabatan_fungsional,
          no_sk: item.no_sk,
          terhitung_mulai: item.terhitung_mulai,
          isEditing: false,
        }
      })
      setData(temp)
    }
  }, [functionalPosition])
  return (
    <div className="space-y-4 rounded-md bg-white">
      <div className="flex gap-4 items-center justify-between">
        <div className="text-xl text-primary font-medium">Jabatan Fungsional</div>
        <div className="flex gap-4 items-center">
          <ButtonSyncLecturerDetail
            link={`/website-utama/sdm/${id}/jabatan-fungsional/sync`}
            topik="fcm_sync_sdm_jabatan_fungsional"
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
        {/* HEADER */}
        <TableHeader>
          <TableRow className="bg-green-50">
            <TableHead className="text-primary">#</TableHead>
            <TableHead className="text-primary">Jabatan Fungsional</TableHead>
            <TableHead className="text-primary">No. SK</TableHead>
            <TableHead className="text-primary">Terhitung Mulai Tanggal</TableHead>
            <TableHead className="text-primary"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-black whitespace-pre-line">{index + 1}</TableCell>

              {/* Jabatan */}
              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Jabatan Fungsional"
                    className="focus-visible:ring-0 rounded"
                    value={item.jabatan_fungsional}
                    onChange={(e) => {
                      temp[index].jabatan_fungsional = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  item.jabatan_fungsional
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
                    placeholder="DD-MM-YYYY"
                    className="focus-visible:ring-0 rounded"
                    type="date"
                    value={item.terhitung_mulai}
                    onChange={(e) => {
                      temp[index].terhitung_mulai = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  format(new Date(item.terhitung_mulai), 'dd-MM-yyyy')
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

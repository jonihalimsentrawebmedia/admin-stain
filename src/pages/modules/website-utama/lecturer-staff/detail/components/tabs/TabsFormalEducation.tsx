'use client'

import { useEffect, useState } from 'react'
import { Pencil, Plus, Save, Trash2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UseGetFormalEducation } from '../../hooks'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { ButtonSyncLecturerDetail } from '../ButtonSyncDetail'

type EducationType = {
  id: string
  jenjang: string
  gelar: string
  bidang_studi: string
  perguruan_tinggi: string
  tahun_lulus: string
  isEditing?: boolean
  isAdd?: boolean
}

interface props {
  show: boolean
}

export default function TabsFormalEducation(props: props) {
  const { show } = props
  const { id } = useParams()
  const { formalEducation } = UseGetFormalEducation({ id_sdm: id })
  const [data, setData] = useState<EducationType[]>([])
  const [loading, setLoading] = useState(false)
  const temp = [...data]
  const [newRow, setNewRow] = useState({
    jenjang: '',
    gelar: '',
    bidang_studi: '',
    perguruan_tinggi: '',
    tahun_lulus: '',
  })

  const queryClient = useQueryClient()
  async function handleSaveAdd(values: EducationType) {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id}/pendidikan-formal`, {
      jenjang: values.jenjang,
      gelar: values.gelar,
      bidang_studi: values.bidang_studi,
      perguruan_tinggi: values.perguruan_tinggi,
      tahun_lulus: values.tahun_lulus,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['formal-education'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  async function handleSaveEdit(values: EducationType) {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${id}/pendidikan-formal/${values.id}`, {
      jenjang: values.jenjang,
      gelar: values.gelar,
      bidang_studi: values.bidang_studi,
      perguruan_tinggi: values.perguruan_tinggi,
      tahun_lulus: values.tahun_lulus,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['formal-education'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const handleDelete = async (values: EducationType) => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id}/pendidikan-formal/${values.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)

          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['formal-education'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  const handleAdd = () => {
    // if (!newRow.jenjang) return

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
      jenjang: '',
      gelar: '',
      bidang_studi: '',
      perguruan_tinggi: '',
      tahun_lulus: '',
    })
  }

  useEffect(() => {
    if (formalEducation) {
      const temp = formalEducation.map((item) => {
        return {
          id: item.id_pendidikan_formal,
          jenjang: item.jenjang,
          gelar: item.gelar,
          bidang_studi: item.bidang_studi,
          perguruan_tinggi: item.perguruan_tinggi,
          tahun_lulus: item.tahun_lulus,
          isEditing: false,
        }
      })
      setData(temp)
    }
  }, [formalEducation])

  return (
    <div className=" rounded-md space-y-4 bg-white">
      <div className="flex gap-4 items-center justify-between flex-wrap">
        <div className="text-xl text-primary font-medium">Pendidikan Formal</div>
        <div className="flex flex-wrap gap-4 items-center">
          {show && (
            <ButtonSyncLecturerDetail
              link={`/website-utama/sdm/${id}/pendidikan-formal/sync`}
              topik="fcm_sync_sdm_pendidikan_formal"
            />
          )}
          {/* <Button
            disabled={loading}
            variant={'outline'}
            className="border-primary text-primary hover:text-primary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sinkronisasi SISTER
          </Button> */}
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
        <TableHeader>
          <TableRow className="bg-green-50 text-primary">
            <TableHead className="text-primary">#</TableHead>
            <TableHead className="text-primary">Jenjang</TableHead>
            <TableHead className="text-primary">Gelar</TableHead>
            <TableHead className="text-primary">Bidang Studi</TableHead>
            <TableHead className="text-primary">Perguruan Tinggi / Sekolah</TableHead>
            <TableHead className="text-primary">Tahun Lulus</TableHead>
            <TableHead className="text-primary"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-black whitespace-pre-line">{index + 1}</TableCell>

              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Jenjang"
                    disabled={loading}
                    className="focus-visible:ring-0 rounded"
                    value={item.jenjang}
                    onChange={(e) => {
                      temp[index].jenjang = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  item.jenjang
                )}
              </TableCell>

              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Gelar"
                    disabled={loading}
                    className="focus-visible:ring-0 rounded"
                    value={item.gelar}
                    onChange={(e) => {
                      temp[index].gelar = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  item.gelar
                )}
              </TableCell>

              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Bidang Studi"
                    disabled={loading}
                    className="focus-visible:ring-0 rounded"
                    value={item.bidang_studi}
                    onChange={(e) => {
                      temp[index].bidang_studi = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  item.bidang_studi
                )}
              </TableCell>

              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Perguruan Tinggi / Sekolah"
                    disabled={loading}
                    className="focus-visible:ring-0 rounded"
                    value={item.perguruan_tinggi}
                    onChange={(e) => {
                      temp[index].perguruan_tinggi = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  item.perguruan_tinggi
                )}
              </TableCell>

              <TableCell className="text-black whitespace-pre-line">
                {item.isEditing ? (
                  <Input
                    placeholder="Tahun Lulus"
                    disabled={loading}
                    className="focus-visible:ring-0 rounded"
                    value={item.tahun_lulus}
                    onChange={(e) => {
                      temp[index].tahun_lulus = e.target.value
                      setData(temp)
                    }}
                  />
                ) : (
                  item.tahun_lulus
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
  )
}

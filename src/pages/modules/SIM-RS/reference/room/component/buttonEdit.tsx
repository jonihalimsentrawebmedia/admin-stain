import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type TResolverRoomUpdate, ResolverRoomUpdate } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IRoom } from '../data/types.ts'
import { useNavigate } from 'react-router-dom'
import { FormRoomUpdate } from './forms.tsx'

const toLocalDateTimeString = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d}T${h}:${min}`
}

interface Props {
  data: IRoom
}

export const FormEditRoom = (props: Props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverRoomUpdate>({
    resolver: zodResolver(ResolverRoomUpdate),
  })

  const now = toLocalDateTimeString(new Date())

  useEffect(() => {
    if (data) {
      form.reset({
        nama: data.nama,
        nomor: data.nomor,
        id_jenis_ruangan: data.id_jenis_ruangan,
        jumlah_kasur: data.jumlah_kasur,
        lokasi: data.lokasi,
        is_status: String(data.is_status),
        tanggal: now,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const HandleSave = async (value: TResolverRoomUpdate) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/ruangan/${data?.id_ruangan}`, {
      ...value,
      is_status: value.is_status === 'true',
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data ruangan')
          queryClient.invalidateQueries({ queryKey: ['room'] })
          queryClient.invalidateQueries({ queryKey: ['detail-room', data?.id_ruangan] })
          setLoading(false)
          navigate('/modules/sim-rs/reference/room')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <FormRoomUpdate
        HandleSave={HandleSave}
        form={form}
        loading={loading}
      />
    </>
  )
}

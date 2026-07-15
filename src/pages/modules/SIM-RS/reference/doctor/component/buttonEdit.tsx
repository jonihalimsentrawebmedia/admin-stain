import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverDoctorUpdate, type TResolverDoctorUpdate } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IDoctor } from '../data/types.ts'
import { useNavigate } from 'react-router-dom'
import { FormDoctorUpdate } from './forms.tsx'
import { format, parseISO } from 'date-fns'

interface Props {
  data: IDoctor
}

export const FormEditDoctor = (props: Props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverDoctorUpdate>({
    resolver: zodResolver(ResolverDoctorUpdate),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_spesialis: data.id_spesialis,
        jenis_kelamin: data.jenis_kelamin,
        id_poli: data.id_poli,
        nama: data.nama,
        no_sip: data.no_sip,
        telepon: data.telepon,
        email: data.email,
        is_status: String(data.is_status),
        tanggal: format(parseISO(data.tanggal_registrasi), "yyyy-MM-dd'T'HH:mm"),
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const HandleSave = async (value: TResolverDoctorUpdate) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/dokter/${data?.id_dokter}`, {
      ...value,
      is_status: value.is_status === 'true',
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data dokter')
          queryClient.invalidateQueries({ queryKey: ['doctor'] })
          queryClient.invalidateQueries({ queryKey: ['detail-doctor', data?.id_dokter] })
          setLoading(false)
          navigate('/modules/sim-rs/reference/doctor')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <FormDoctorUpdate HandleSave={HandleSave} form={form} loading={loading} />
    </>
  )
}

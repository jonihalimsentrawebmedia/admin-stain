import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverPoliUpdate, type TResolverPoliUpdate } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormPoliUpdate } from './forms.tsx'
import type { IPoli } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

interface Props {
  data: IPoli
}

export const ButtonEditPoli = (props: Props) => {
  const { data } = props
  const navigate = useNavigate()

  return (
    <>
      <button
        onClick={() => navigate(`/modules/sim-rs/reference/poli/edit/${data.id_poli}`)}
        className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>
    </>
  )
}

export const FormEditPoli = (props: Props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPoliUpdate>({
    resolver: zodResolver(ResolverPoliUpdate),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama: data.nama,
        lokasi: data.lokasi,
        is_status: String(data.is_status),
        tanggal: format(parseISO(data.tanggal_registrasi), "yyyy-MM-dd'T'HH:mm"),
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const HandleSave = async (value: TResolverPoliUpdate) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/poli/${data?.id_poli}`, {
      ...value,
      is_status: value.is_status === 'true',
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data poli')
          queryClient.invalidateQueries({ queryKey: ['poli'] })
          queryClient.invalidateQueries({ queryKey: ['detail-poli', data?.id_poli] })
          setLoading(false)
          navigate('/modules/sim-rs/reference/poli')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <FormPoliUpdate HandleSave={HandleSave} form={form} loading={loading} />
    </>
  )
}

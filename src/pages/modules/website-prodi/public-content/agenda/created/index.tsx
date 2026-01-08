import { AgendaForm } from '@/pages/modules/website-utama/public-content/agenda/components/form.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { TimeStampLocal } from '@/utils/helper.tsx'
import {
  AgendaResolver,
  type AgendaType,
} from '@/pages/modules/website-utama/public-content/agenda/data/resolver.tsx'

export const CreateAgendaProdiPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<AgendaType>({
    resolver: zodResolver(AgendaResolver),
  })

  const navigate = useNavigate()

  const HandleSave = async (e: AgendaType) => {
    setLoading(true)
    await AxiosClient.post('/prodi/agenda', {
      ...e,
      waktu_mulai: TimeStampLocal(e?.waktu_mulai),
      waktu_selesai: e?.waktu_selesai ? TimeStampLocal(e?.waktu_selesai) : null,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data agenda')
          setLoading(false)
          navigate('/modules/website-prodi/public-content/agenda')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <AgendaForm form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}

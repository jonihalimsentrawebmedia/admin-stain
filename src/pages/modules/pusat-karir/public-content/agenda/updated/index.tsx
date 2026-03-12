import { AgendaForm } from '@/pages/modules/website-utama/public-content/agenda/components/form.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { TimeStampLocal } from '@/utils/helper.tsx'
import {
  AgendaResolver,
  type AgendaType,
} from '@/pages/modules/website-utama/public-content/agenda/data/resolver.tsx'
import { UseGetAgendaCarrierDetail } from '../hooks/index'
import { format, parseISO } from 'date-fns'

export const UpdatedAgendaCarrierPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<AgendaType>({
    resolver: zodResolver(AgendaResolver),
  })

  const { id } = useParams()
  const { agendaUnitDetail: detail } = UseGetAgendaCarrierDetail(id ?? '')
  const navigate = useNavigate()

  useEffect(() => {
    if (detail) {
      form.reset({
        penulis: detail?.penulis,
        isi_agenda: detail?.isi_agenda,
        judul: detail?.judul,
        gambar: detail?.gambar,
        keterangan_gambar: detail?.keterangan_gambar,
        lokasi_kegiatan: detail?.lokasi_kegiatan,
        waktu_mulai: format(parseISO(detail?.waktu_mulai), "yyyy-MM-dd'T'HH:mm"),
        waktu_selesai: format(parseISO(detail?.waktu_selesai), "yyyy-MM-dd'T'HH:mm"),
      })
    }
  }, [detail])

  const HandleSave = async (e: AgendaType) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/agenda/${detail?.id_agenda}`, {
      ...e,
      waktu_mulai: TimeStampLocal(e?.waktu_mulai),
      waktu_selesai: e?.waktu_selesai ? TimeStampLocal(e?.waktu_selesai) : null,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data agenda')
          setLoading(false)
          navigate('/modules/pusat-karir/public-content/agenda')
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

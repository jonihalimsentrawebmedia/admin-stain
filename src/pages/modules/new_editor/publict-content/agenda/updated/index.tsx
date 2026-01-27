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
import { format, parseISO } from 'date-fns'
import { UseGetAgendaManagementEditorDetail } from '../hooks/index'

export const UpdatedAgendaManagementEditorPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<AgendaType>({
    resolver: zodResolver(AgendaResolver),
  })

  const { id } = useParams()
  const { agendaManagementEditorDetail: detail } = UseGetAgendaManagementEditorDetail(id ?? '')
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
    await AxiosClient.put(`/editor/agenda/${detail?.id_agenda}`, {
      ...e,
      waktu_mulai: TimeStampLocal(e?.waktu_mulai),
      waktu_selesai: e?.waktu_selesai ? TimeStampLocal(e?.waktu_selesai) : null,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data agenda')
          setLoading(false)
          navigate('/modules/editor/dashboard')
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

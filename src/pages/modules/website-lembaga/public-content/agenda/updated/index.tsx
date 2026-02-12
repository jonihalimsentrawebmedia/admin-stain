import { AgendaForm } from '../components/form'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AgendaResolver, type AgendaType } from '../data/resolver'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetAgendaDetail } from '../hooks/index'
import { format, parseISO } from 'date-fns'
import { TimeStampLocal } from '@/utils/helper.tsx'

export const UpdatedAgendaPage = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { detailAgenda } = UseGetAgendaDetail(id ?? '')

  useEffect(() => {
    if (detailAgenda) {
      form.reset({
        penulis: detailAgenda?.penulis,
        isi_agenda: detailAgenda?.isi_agenda,
        judul: detailAgenda?.judul,
        gambar: detailAgenda?.gambar,
        keterangan_gambar: detailAgenda?.keterangan_gambar,
        lokasi_kegiatan: detailAgenda?.lokasi_kegiatan,
        waktu_mulai: format(parseISO(detailAgenda?.waktu_mulai), "yyyy-MM-dd'T'HH:mm"),
        waktu_selesai: format(parseISO(detailAgenda?.waktu_selesai), "yyyy-MM-dd'T'HH:mm"),
      })
    }
  }, [detailAgenda])

  const form = useForm<AgendaType>({
    resolver: zodResolver(AgendaResolver),
  })

  const navigate = useNavigate()

  const HandleSave = async (e: AgendaType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/agenda/${detailAgenda?.id_agenda}`, {
      ...e,
      waktu_mulai: TimeStampLocal(e?.waktu_mulai),
      waktu_selesai: e?.waktu_selesai ? TimeStampLocal(e?.waktu_selesai) : null,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data agenda')
          setLoading(false)
          navigate('/modules/website-utama/public-content/agenda')
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

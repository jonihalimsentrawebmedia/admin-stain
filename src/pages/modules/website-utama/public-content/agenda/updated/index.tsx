import { AgendaForm } from '@/pages/modules/website-utama/public-content/agenda/components/form.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AgendaResolver, type AgendaType } from '../data/resolver'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/hooks'
import { format } from 'date-fns'

export const UpdatedAgendaPage = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { detailAgenda } = UseGetAgendaDetail(id ?? '')

  useEffect(() => {
    if (detailAgenda) {
      const tempUnit = detailAgenda?.list_unit_terkait?.map((row) => row?.id_unit)
      form.reset({
        penulis: detailAgenda?.penulis,
        isi_agenda: detailAgenda?.isi_agenda,
        judul: detailAgenda?.judul,
        gambar: detailAgenda?.gambar,
        keterangan_gambar: detailAgenda?.keterangan_gambar,
        lokasi_kegiatan: detailAgenda?.lokasi_kegiatan,
        list_unit: tempUnit,
        waktu_mulai: detailAgenda?.waktu_mulai
          ? format(detailAgenda?.waktu_mulai, 'yyyy-MM-dd HH:mm')
          : '',
        waktu_selesai: detailAgenda?.waktu_selesai
          ? format(detailAgenda?.waktu_selesai, 'yyyy-MM-dd HH:mm')
          : '',
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
      waktu_mulai: new Date(e.waktu_mulai).toISOString(),
      waktu_selesai: e?.waktu_selesai ? new Date(e.waktu_selesai).toISOString() : null,
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
      <AgendaForm is_website_main form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}

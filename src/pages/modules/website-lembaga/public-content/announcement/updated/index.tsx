import { AnnouncementForm } from '@/pages/modules/website-utama/public-content/announcement/components/form.tsx'
import { useForm } from 'react-hook-form'
import { AnnouncementResolver, type AnnouncementType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetAnnouncementDetail } from '@/pages/modules/website-utama/public-content/announcement/hooks'

export const UpdatedAnnouncementPage = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { detailAnnouncement } = UseGetAnnouncementDetail(id ?? '')

  useEffect(() => {
    if (detailAnnouncement) {
      form.reset({
        penulis: detailAnnouncement?.penulis,
        isi_pengumuman: detailAnnouncement?.isi_pengumuman,
        judul_pengumuman: detailAnnouncement?.judul_pengumuman,
        dokumens: detailAnnouncement?.dokumens,
      })
    }
  }, [detailAnnouncement])

  const navigate = useNavigate()

  const form = useForm<AnnouncementType>({
    resolver: zodResolver(AnnouncementResolver),
  })

  const HandleSave = async (e: AnnouncementType) => {
    setLoading(true)
    await AxiosClient.put(`/lembaga/pengumuman/${detailAnnouncement?.id_pengumuman}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data pengumuman')
          setLoading(false)
          navigate('/modules/website-lembaga/public-content/announcement')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <div>
        <AnnouncementForm form={form} HandleSave={HandleSave} loading={loading} />
      </div>
    </>
  )
}

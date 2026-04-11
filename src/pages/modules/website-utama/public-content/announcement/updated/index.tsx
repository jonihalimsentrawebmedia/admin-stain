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
      const tempUnit = detailAnnouncement?.list_unit_terkait?.map((row) => row?.id_unit)
      form.reset({
        penulis: detailAnnouncement?.penulis,
        isi_pengumuman: detailAnnouncement?.isi_pengumuman,
        judul_pengumuman: detailAnnouncement?.judul_pengumuman,
        dokumens: detailAnnouncement?.dokumens,
        list_unit: tempUnit,
      })
    }
  }, [detailAnnouncement])

  const navigate = useNavigate()

  const form = useForm<AnnouncementType>({
    resolver: zodResolver(AnnouncementResolver),
  })

  const HandleSave = async (e: AnnouncementType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/pengumuman/${detailAnnouncement?.id_pengumuman}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data pengumuman')
          setLoading(false)
          navigate('/modules/website-utama/public-content/announcement')
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
        <AnnouncementForm is_website_main form={form} HandleSave={HandleSave} loading={loading} />
      </div>
    </>
  )
}

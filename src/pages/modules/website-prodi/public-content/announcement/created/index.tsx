import { AnnouncementForm } from '@/pages/modules/website-utama/public-content/announcement/components/form.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  AnnouncementResolver,
  type AnnouncementType,
} from '@/pages/modules/website-utama/public-content/announcement/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const CreatedAnnouncementProdi = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<AnnouncementType>({
    resolver: zodResolver(AnnouncementResolver),
  })

  const HandleSave = async (e: AnnouncementType) => {
    setLoading(true)
    await AxiosClient.post('/prodi/pengumuman', e).then((res) => {
      if (res.data.status) {
        setLoading(false)
        navigate('/modules/website-prodi/public-content/announcement')
        toast.success(res.data.message || 'Pengumuman berhasil dibuat')
      }
    }).catch((err) => {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      setLoading(false)
    })
  }

  return (
    <>
      <AnnouncementForm form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}

import { AnnouncementForm } from '../components/form'
import { useForm } from 'react-hook-form'
import { AnnouncementResolver, type AnnouncementType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreateAnnouncementPage = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<AnnouncementType>({
    resolver: zodResolver(AnnouncementResolver),
  })

  const HandleSave = async (e: AnnouncementType) => {
    setLoading(true)
    await AxiosClient.post('/lembaga/pengumuman', {
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

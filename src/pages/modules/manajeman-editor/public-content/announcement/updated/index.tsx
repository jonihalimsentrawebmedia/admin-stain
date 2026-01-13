import { AnnouncementForm } from '@/pages/modules/website-utama/public-content/announcement/components/form.tsx'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  AnnouncementResolver,
  type AnnouncementType,
} from '@/pages/modules/website-utama/public-content/announcement/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetManagementEditorAnnouncementDetail } from '../hooks'

export const UpdatedAnnouncementManagementEditor = () => {
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const { managementEditorAnnouncementDetail: detail } = UseGetManagementEditorAnnouncementDetail(id ?? '')
  const navigate = useNavigate()

  useEffect(() => {
    if (detail) {
      form.reset({
        judul_pengumuman: detail?.judul_pengumuman,
        isi_pengumuman: detail?.isi_pengumuman,
        penulis: detail?.penulis,
        dokumens: detail?.dokumens,
      })
    }
  }, [detail])

  const form = useForm<AnnouncementType>({
    resolver: zodResolver(AnnouncementResolver),
  })

  const HandleSave = async (e: AnnouncementType) => {
    setLoading(true)
    await AxiosClient.put(`/editor/pengumuman/${detail?.id_pengumuman}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/editor/public-content/announcement')
          toast.success(res.data.message || 'Pengumuman berhasil dibuat')
        }
      })
      .catch((err) => {
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

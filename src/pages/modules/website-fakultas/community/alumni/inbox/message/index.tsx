import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetDetailStoryInbox } from '@/pages/modules/website-fakultas/community/alumni/inbox/hooks'
import { FormStoryAlumni } from '@/pages/modules/website-fakultas/community/alumni/story/component/form.tsx'
import {
  type StoryForm,
  StoryResolver,
} from '@/pages/modules/website-fakultas/community/alumni/story/data/resolver.tsx'

export const AlumniMessageInbox = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailStoryInbox(id as string)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (detail) {
      form.reset({
        nama_lengkap: detail?.nama_lengkap,
        id_prodi: detail?.id_prodi,
        tahun_masuk: detail?.tahun_masuk,
      })
    }
  }, [detail])

  const navigate = useNavigate()
  const form = useForm<StoryForm>({
    resolver: zodResolver(StoryResolver),
  })

  const HandleSave = (data: StoryForm) => {
    setLoading(true)
    AxiosClient.post(`/fakultas/cerita-alumni-kontak-masuk/${id}`, data)
      .then((res) => {
        if (res.data.status) {
          navigate('/modules/website-fakultas/community/alumni/inbox')
          setLoading(false)
          toast.success(res.data.message || 'Success menambahkan data')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormStoryAlumni
        label={'Cerita Alumni'}
        form={form}
        HandleSave={HandleSave}
        loading={loading}
      />
    </>
  )
}

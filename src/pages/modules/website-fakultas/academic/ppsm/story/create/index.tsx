import { FormStoryAlumni } from '@/pages/modules/website-fakultas/academic/ppsm/story/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  type StoryForm,
  StoryResolver,
} from '@/pages/modules/website-fakultas/academic/ppsm/story/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedStoryAlumni = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const form = useForm<StoryForm>({
    resolver: zodResolver(StoryResolver),
  })

  const HandleSave = (data: StoryForm) => {
    setLoading(true)
    AxiosClient.post('/fakultas/cerita-ppsm', data)
      .then((res) => {
        if (res.data.status) {
          navigate('/modules/website-fakultas/academic/ppsm/story')
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
        label={'Tambah Cerita'}
        form={form}
        HandleSave={HandleSave}
        loading={loading}
      />
    </>
  )
}

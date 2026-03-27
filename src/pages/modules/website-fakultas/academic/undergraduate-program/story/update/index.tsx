import { UseGetStoryDetailUnderGraduated } from '../hooks/index.tsx'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  type StoryForm,
  StoryResolver,
} from '@/pages/modules/website-fakultas/academic/ppsm/story/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormStoryAlumni } from '../component/form.tsx'

export const UpdateStoryUnderGraduated = () => {
  const { id } = useParams()
  const { storyDetail } = UseGetStoryDetailUnderGraduated(id as string)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (storyDetail) {
      form.reset({
        url_gambar: storyDetail?.url_gambar,
        cerita: storyDetail?.cerita,
        nama_lengkap: storyDetail?.nama_lengkap,
        id_prodi: storyDetail?.id_prodi,
        tahun_lulus: storyDetail?.tahun_lulus,
      })
    }
  }, [storyDetail])

  const navigate = useNavigate()
  const form = useForm<StoryForm>({
    resolver: zodResolver(StoryResolver),
  })

  const HandleSave = (data: StoryForm) => {
    setLoading(true)
    AxiosClient.put(
      `/fakultas/cerita-international-ungreaduate-program/${storyDetail?.id_cerita_international_ungaduate_program}`,
      data
    )
      .then((res) => {
        if (res.data.status) {
          navigate('/modules/website-fakultas/academic/undergraduate-program/story')
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
        label={'Edit Cerita'}
        form={form}
        HandleSave={HandleSave}
        loading={loading}
      />
    </>
  )
}

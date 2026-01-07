import { FormNewsContent } from '@/pages/modules/website-utama/public-content/news/components/form.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  type INewsTypeForm,
  NewsResolver,
} from '@/pages/modules/website-utama/public-content/news/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const NewsProdiCreated = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  const HandleSubmit = async (e: INewsTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`/prodi/berita`, e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berita berhasil dibuat')
          setLoading(false)
          navigate('/modules/website-prodi/public-content/news')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormNewsContent loading={loading} form={form} HandleSave={HandleSubmit} />
    </>
  )
}

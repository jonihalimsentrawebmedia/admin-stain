import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CarrierArticleResolver, type IArticleCarrierResolver } from '../data/resolver'
import { FormArticleContent } from '@/pages/modules/pusat-karir/public-content/article/components/form.tsx'

export const ArticleCarrierCreated = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<IArticleCarrierResolver>({
    resolver: zodResolver(CarrierArticleResolver),
  })

  const HandleSubmit = async (e: IArticleCarrierResolver) => {
    setLoading(true)
    await AxiosClient.post(`/pusat-karir/artikel`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Artikel berhasil dibuat')
          setLoading(false)
          navigate('/modules/pusat-karir/public-content/article')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormArticleContent loading={loading} form={form} HandleSave={HandleSubmit} />
    </>
  )
}

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ResolverArticle, type IResolverArticleType } from '../data/resolver'
import { FormArticleLppm } from '../components/form'

export const CreatedArticleLppm = () => {
  const form = useForm<IResolverArticleType>({
    resolver: zodResolver(ResolverArticle),
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const HandleSave = async (e: IResolverArticleType) => {
    setLoading(true)
    await AxiosClient.post('/lppm/artikel', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data promosi')
          navigate('/modules/lppm/public-content/article')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormArticleLppm form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}

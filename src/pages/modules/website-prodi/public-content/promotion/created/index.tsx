import { FormPromotionProdi } from '@/pages/modules/website-prodi/public-content/promotion/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { type IResolverPromotionType, ResolverPromotion } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedPromotionProdi = () => {
  const form = useForm<IResolverPromotionType>({
    resolver: zodResolver(ResolverPromotion),
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const HandleSave = async (e: IResolverPromotionType) => {
    setLoading(true)
    await AxiosClient.post('/prodi/promosi', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data promosi')
          navigate('/modules/website-prodi/public-content/promotion')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormPromotionProdi form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}

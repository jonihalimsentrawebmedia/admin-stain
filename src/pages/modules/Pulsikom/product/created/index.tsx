import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { ResolverProduct, type TResolverProduct } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { FormProduct } from '../component/form.tsx'

export const CreatedProduct = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverProduct>({
    resolver: zodResolver(ResolverProduct),
  })
  const navigate = useNavigate()

  const HandleSave = async (value: TResolverProduct) => {
    setLoading(true)
    await AxiosClient.post('/pusilkom/produk', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate('/modules/pulsikom/products')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormProduct form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}

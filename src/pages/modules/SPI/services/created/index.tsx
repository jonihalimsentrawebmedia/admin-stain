import { FormServiceSPI } from '../component/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { ResolverService, type TResolverService } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

export const CreatedService = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverService>({
    resolver: zodResolver(ResolverService),
  })
  const navigate = useNavigate()

  const HandleSave = async (value: TResolverService) => {
    setLoading(true)
    await AxiosClient.post('/spi/layanan', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate('/modules/spi/services')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormServiceSPI form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}

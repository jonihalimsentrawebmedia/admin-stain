import { FormAdvantage } from '@/pages/modules/Pulsikom/advantage/component/form.tsx'
import { useState } from 'react'
import {
  ResolverAdvantage,
  type TResolverAdvantage,
} from '@/pages/modules/Pulsikom/advantage/data/resolver.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedAdvantage = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const form = useForm<TResolverAdvantage>({
    resolver: zodResolver(ResolverAdvantage),
  })

  const HandleSave = async (value: TResolverAdvantage) => {
    setLoading(true)
    await AxiosClient.post('/pusilkom/keunggulan', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate('/modules/pulsikom/advantage')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormAdvantage form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}

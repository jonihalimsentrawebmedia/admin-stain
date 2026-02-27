import { FormOtherFunding } from './form'
import { useForm } from 'react-hook-form'
import { ResolverOtherFunding, type schemaOtherFunding } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedOtherFunding = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<schemaOtherFunding>({
    resolver: zodResolver(ResolverOtherFunding),
  })

  const HandleSave = async (e: schemaOtherFunding) => {
    setLoading(true)
    await AxiosClient.post('/lppm/pendanaan-lainnya', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success tambah data')
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah data')
      })
  }

  return (
    <>
      <FormOtherFunding
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        label={'Tambah Skema'}
      />
    </>
  )
}

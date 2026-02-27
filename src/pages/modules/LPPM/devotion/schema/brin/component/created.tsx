import { FormDataBRIN } from './form'
import { useForm } from 'react-hook-form'
import { ResolverBRIN, type schemaBRIN } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedBRIN = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<schemaBRIN>({
    resolver: zodResolver(ResolverBRIN),
  })

  const HandleSave = async (e: schemaBRIN) => {
    setLoading(true)
    await AxiosClient.post('/lppm/brin', e)
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
      <FormDataBRIN
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        label={'Tambah Pendanan BRIN'}
      />
    </>
  )
}

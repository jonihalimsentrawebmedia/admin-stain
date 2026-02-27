import { FormDataDRTPM } from './form'
import { useForm } from 'react-hook-form'
import { ResolverDRTPM, type schemaDRTPM } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedDRTPM = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<schemaDRTPM>({
    resolver: zodResolver(ResolverDRTPM),
  })

  const HandleSave = async (e: schemaDRTPM) => {
    setLoading(true)
    await AxiosClient.post('/lppm/drtpm', e)
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
      <FormDataDRTPM
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        label={'Tambah Pendanan DRTPM'}
      />
    </>
  )
}

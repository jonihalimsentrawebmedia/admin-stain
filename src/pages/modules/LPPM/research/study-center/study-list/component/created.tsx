import { FormStudyCenter } from '@/pages/modules/LPPM/research/study-center/study-list/component/form.tsx'
import { useForm } from 'react-hook-form'
import { ResolverStudyCenter, type SchemaStudyCenter } from '../data/reasolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedStudyCenter = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<SchemaStudyCenter>({
    resolver: zodResolver(ResolverStudyCenter),
  })

  const HandleAddStudyCenter = async (e: SchemaStudyCenter) => {
    setLoading(true)
    await AxiosClient.post('/lppm/pusat-studi', e)
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
      <FormStudyCenter
        form={form}
        loading={loading}
        HandleSave={HandleAddStudyCenter}
        label={'Tambah Data'}
      />
    </>
  )
}

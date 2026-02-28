import { FormActivity } from '@/pages/modules/LPPM/research/schema/internal/activity/component/form.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverActivity, type SchemaActivity } from '../data/resolver'
import AxiosClient from '@/provider/axios.tsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const CreatedFormActivity = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<SchemaActivity>({
    resolver: zodResolver(ResolverActivity),
  })

  const HandleSave = async (e: SchemaActivity) => {
    setLoading(true)
    await AxiosClient.post('/lppm/daftar-program-kegiatan', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate(-1)
          toast.success(res.data.message || 'Success tambah data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah data')
      })
  }

  return (
    <>
      <FormActivity form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}

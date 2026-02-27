import { FormActivityProgram } from './form'
import { useForm } from 'react-hook-form'
import { ResolverActivityProgram, type SchemaActivityProgram } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedActivityProgram = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<SchemaActivityProgram>({
    resolver: zodResolver(ResolverActivityProgram),
  })

  const HandleSave = async (e: SchemaActivityProgram) => {
    setLoading(true)
    await AxiosClient.post('/lppm/daftar-skema', e)
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
      <FormActivityProgram
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        label={'Tambah Program Kegiatan'}
      />
    </>
  )
}

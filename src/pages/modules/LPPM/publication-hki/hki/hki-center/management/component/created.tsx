import { FormManagement } from '@/pages/modules/LPPM/publication-hki/component/form.tsx'
import { useForm } from 'react-hook-form'
import {
  type SchemaUserManagement,
  UserManagementResolver,
} from '@/pages/modules/LPPM/publication-hki/component/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CreatedUserManagementHKI = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<SchemaUserManagement>({
    resolver: zodResolver(UserManagementResolver),
    defaultValues: {
      context: 'Pusat KI & Layanan Teknis',
    },
  })

  const HandleSave = async (data: SchemaUserManagement) => {
    setLoading(true)
    await AxiosClient.post('/lppm/pusat-publikasi-anggota/pusat-hki', data)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message)
          setLoading(false)
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <FormManagement form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}

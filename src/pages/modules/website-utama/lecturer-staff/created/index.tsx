import FormEmployee from '@/pages/modules/website-utama/lecturer-staff/component/form.tsx'
import { useForm } from 'react-hook-form'
import { EmployeeResolver, type TEmployeeResolver } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedEmployee = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<TEmployeeResolver>({
    resolver: zodResolver(EmployeeResolver),
  })
  const navigate = useNavigate()

  const HandleSave = async (value: TEmployeeResolver) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/sdm', {
      ...value,
      tanggal_lahir: new Date(value?.tanggal_lahir).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          navigate('/modules/website-utama/staff-lecturer/data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <FormEmployee
        form={form}
        loading={loading}
        HandlerSave={HandleSave}
        label={'Tambah Data Dosen & Staff'}
      />
    </>
  )
}

import FormEmployee from '@/pages/modules/website-utama/lecturer-staff/component/form.tsx'
import { useForm } from 'react-hook-form'
import { EmployeeResolver, type TEmployeeResolver } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetEmployeeById } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { format } from 'date-fns'

export const UpdatedEmployee = () => {
  const { id } = useParams()

  const { employee } = UseGetEmployeeById(id as string)

  const [loading, setLoading] = useState(false)
  const form = useForm<TEmployeeResolver>({
    resolver: zodResolver(EmployeeResolver),
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (employee) {
      form.reset({
        ...employee,
        type_pegawai: employee?.is_dosen ? 'DOSEN' : 'STAFF',
        tanggal_lahir: format(employee.tanggal_lahir, 'yyyy-MM-dd'),
      })
    }
  }, [employee])

  const HandleSave = async (value: TEmployeeResolver) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm/${employee?.id_sdm}`, {
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
        label={'Edit Data Dosen & Staff'}
      />
    </>
  )
}

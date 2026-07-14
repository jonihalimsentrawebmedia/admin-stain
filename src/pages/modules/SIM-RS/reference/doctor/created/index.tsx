import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverDoctorCreate, type TResolverDoctorCreate } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormDoctorCreate } from '../component/forms.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateDoctor = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverDoctorCreate>({
    resolver: zodResolver(ResolverDoctorCreate),
  })

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverDoctorCreate) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/dokter', value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/reference/doctor')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <div>
        <ButtonTitleGroup isBack label={'Tambah Data Dokter'} buttonGroup={[]} />
        <FormDoctorCreate loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreateDoctor

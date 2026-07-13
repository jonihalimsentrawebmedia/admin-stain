import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverPoliCreate, type TResolverPoliCreate } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormPoliCreate } from '../component/forms.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreatePoli = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPoliCreate>({
    resolver: zodResolver(ResolverPoliCreate),
  })

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverPoliCreate) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/poli', value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/reference/poli')
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
        <ButtonTitleGroup isBack label={'Tambah Data Poli'} buttonGroup={[]} />
        <FormPoliCreate loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreatePoli

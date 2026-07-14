import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverRoomCreate, type TResolverRoomCreate } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormRoomCreate } from '../component/forms.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateRoom = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverRoomCreate>({
    resolver: zodResolver(ResolverRoomCreate),
  })

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverRoomCreate) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/ruangan', value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/reference/room')
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
        <ButtonTitleGroup isBack label={'Tambah Data Ruangan'} buttonGroup={[]} />
        <FormRoomCreate loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreateRoom

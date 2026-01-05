import { useForm } from 'react-hook-form'
import { type IRegisterPath, ResolverRegisterPath } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { RegistrationPathForm } from '@/pages/modules/website-utama/jalur-pendaftaran/components/form.tsx'
import { useNavigate } from 'react-router-dom'

export const AddPageRegisterPath = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<IRegisterPath>({
    resolver: zodResolver(ResolverRegisterPath),
  })

  const handleSave = async (value: IRegisterPath) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/jalur-pendaftaran', {
      ...value,
      status: value?.status ? 'Y' : 'N',
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          navigate('/modules/website-utama/jalur-pendaftaran')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <RegistrationPathForm form={form} handleSave={handleSave} loading={loading} />
    </>
  )
}

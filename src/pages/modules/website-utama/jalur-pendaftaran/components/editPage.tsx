import { useForm } from 'react-hook-form'
import { type IRegisterPath, ResolverRegisterPath } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { RegistrationPathForm } from '@/pages/modules/website-utama/jalur-pendaftaran/components/form.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetRegisterPathById } from '@/pages/modules/website-utama/jalur-pendaftaran/hooks'

export const EditPageRegisterPath = () => {
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const { registerPath } = UseGetRegisterPathById(id ?? '')

  useEffect(() => {
    if (registerPath) {
      form.reset({
        nama_jalur_pendaftaran: registerPath.nama_jalur_pendaftaran,
        deskripsi: registerPath.deskripsi,
        status: registerPath?.status === 'Y',
      })
    }
  }, [registerPath])

  const navigate = useNavigate()

  const form = useForm<IRegisterPath>({
    resolver: zodResolver(ResolverRegisterPath),
  })

  const handleSave = async (value: IRegisterPath) => {
    setLoading(true)
    await AxiosClient.put(
      `/website-utama/jalur-pendaftaran/${registerPath?.id_jalur_pendaftaran}`,
      {
        ...value,
        status: value?.status ? 'Y' : 'N',
      }
    )
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

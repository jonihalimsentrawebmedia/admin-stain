import { FormServicePulsikom } from '@/pages/modules/Pulsikom/services/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { ResolverService, type TResolverService } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { UseGetServiceDetail } from '@/pages/modules/Pulsikom/services/hooks'

export const UpdatedService = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetServiceDetail((id as string) ?? '')

  const form = useForm<TResolverService>({
    resolver: zodResolver(ResolverService),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        url_gambar: detail?.url_gambar,
        nama_layanan: detail?.nama_layanan,
        urutan: detail?.urutan,
        deskripsi_lengkap: detail?.deskripsi_lengkap,
        deskripsi_singkat: detail?.deskripsi_singkat,
      })
    }
  }, [detail])

  const HandleSave = async (value: TResolverService) => {
    setLoading(true)
    await AxiosClient.put(`/pusilkom/layanan/${detail?.id_layanan}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate('/modules/pulsikom/services')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormServicePulsikom form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}

import { ImpactInnovationForm } from '@/pages/modules/website-utama/public-content/impact-innovation/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ImpactInnovationResolver, type ImpactInnovationType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreateImpactInnovationPage = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<ImpactInnovationType>({
    resolver: zodResolver(ImpactInnovationResolver),
  })

  const navigate = useNavigate()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/inovasi-berdampak', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/public-content/impact-innovation')
          toast.success(res.data.message || 'Success Pengajuan tambah data inovasi berdampak')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <ImpactInnovationForm loading={loading} form={form} HandleSave={HandleSave} />
    </>
  )
}

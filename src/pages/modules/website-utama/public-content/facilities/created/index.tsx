import { FormFacilities } from '@/pages/modules/website-utama/public-content/facilities/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FacilitiesResolver, type FacilitiesType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedFacilitiesPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<FacilitiesType>({
    resolver: zodResolver(FacilitiesResolver),
  })

  const navigate = useNavigate()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/fasilitas', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data fasilitas')
          navigate('/modules/website-utama/public-content/facilities')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormFacilities loading={loading} form={form} HandleSave={HandleSave} />
    </>
  )
}

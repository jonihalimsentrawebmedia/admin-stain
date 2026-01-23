import { FormFacilitiesUnit } from '@/pages/modules/website-unit/public-content/Facilities/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FacilitiesUnitResolver, type FacilitiesUnitResolverType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedFacilitiesUnit = () => {
  const form = useForm<FacilitiesUnitResolverType>({
    resolver: zodResolver(FacilitiesUnitResolver),
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const HandleSave = async (e: FacilitiesUnitResolverType) => {
    setLoading(true)
    await AxiosClient.post('/unit/unit-fasilitas', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success tambah data fasilitas')
          navigate('/modules/website-unit/public-content/facilities')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <FormFacilitiesUnit form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}

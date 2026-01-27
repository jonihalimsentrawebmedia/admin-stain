import { FormFacilitiesUnit } from '@/pages/modules/website-unit/public-content/Facilities/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { FacilitiesUnitResolver, type FacilitiesUnitResolverType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetFacilitiesUnitDetail } from '@/pages/modules/website-unit/public-content/Facilities/hooks'

export const UpdatedFacilitiesUnit = () => {
  const { id } = useParams()
  const { facilitiesUnitDetail: detail } = UseGetFacilitiesUnitDetail(id ?? '')

  const navigate = useNavigate()

  const form = useForm<FacilitiesUnitResolverType>({
    resolver: zodResolver(FacilitiesUnitResolver),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        nama_fasilitas: detail?.nama_fasilitas,
        gambar: detail?.gambar,
        keterangan_gambar: detail?.keterangan_gambar,
        deskripsi: detail?.deskripsi,
        unit_fasilitas_gambar_tambahan: detail?.unit_fasilitas_gambar_tambahan,
      })
    }
  }, [detail])

  const [loading, setLoading] = useState(false)

  const HandleSave = async (e: FacilitiesUnitResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/unit/unit-fasilitas/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success tambah data fasilitas')
          navigate('/modules/website-unit/public-content/facilities-unit')
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

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import {
  FacilitiesUnitResolver,
  type FacilitiesUnitResolverType,
} from '@/pages/modules/website-unit/public-content/Facilities/data/resolver.tsx'
import { UseGetFacilitiesUnitDetail } from '../hooks/index'
import { FormFacilitiesUnit } from '../component/form.tsx'

export const UpdatedFacilitiesUnit = () => {
  const { id } = useParams()
  const { detailFacilities: detail } = UseGetFacilitiesUnitDetail(id ?? '')

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
    await AxiosClient.put(`/editor/unit-fasilitas/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success tambah data fasilitas')
          navigate('/modules/editor/dashboard')
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

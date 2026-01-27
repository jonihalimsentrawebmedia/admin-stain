import { FormFacilities } from '@/pages/modules/website-utama/public-content/facilities/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { FacilitiesResolver, type FacilitiesType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetFacilitiesDetail } from '../hooks/index'

export const UpdatedFacilitiesPage = () => {
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const { detailFacilities } = UseGetFacilitiesDetail(id ?? '')

  useEffect(() => {
    if (detailFacilities) {
      form.reset({
        gambar: detailFacilities?.gambar,
        alamat: detailFacilities?.alamat,
        no_hp_pembantu: detailFacilities?.no_hp_pembantu,
        email_pembantu: detailFacilities?.email_pembantu,
        nama_fasilitas: detailFacilities?.nama_fasilitas,
        deskripsi: detailFacilities?.deskripsi,
        jam_operasional: detailFacilities?.jam_operasional,
        link_google_map: detailFacilities?.link_google_map,
      })
    }
  }, [detailFacilities])

  const form = useForm<FacilitiesType>({
    resolver: zodResolver(FacilitiesResolver),
  })

  const navigate = useNavigate()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(`/editor/fasilitas/${detailFacilities?.id_fasilitas}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data fasilitas')
          navigate('/modules/editor/public-content/facilities')
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

import { ImpactInnovationForm } from '@/pages/modules/website-utama/public-content/impact-innovation/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ImpactInnovationResolver, type ImpactInnovationType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetImpactInnovationDetail } from '@/pages/modules/website-utama/public-content/impact-innovation/hooks'

export const UpdatedImpactInnovationPage = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<ImpactInnovationType>({
    resolver: zodResolver(ImpactInnovationResolver),
  })

  const { id } = useParams()
  const { detailImpactInnovation: detail } = UseGetImpactInnovationDetail(id ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        gambar: detail?.gambar,
        keterangan_gambar: detail?.keterangan_gambar,
        isi_inovasi_berdampak: detail?.isi_inovasi_berdampak,
        penulis: detail?.penulis,
        id_kategori_inovasi_berdampak: detail?.id_kategori_inovasi_berdampak,
        gambar_tambahan: detail?.gambar_tambahan,
      })
    }
  }, [detail])

  const navigate = useNavigate()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/inovasi-berdampak/${detail?.id_inovasi_berdampak}`, e)
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

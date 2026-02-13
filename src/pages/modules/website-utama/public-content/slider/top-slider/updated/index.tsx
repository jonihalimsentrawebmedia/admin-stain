import { FormCreateSliderOnTop } from '../create/component/form'
import { useForm } from 'react-hook-form'
import { TopSliderResolver, type TopSliderType } from '../create/data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetSliderDetail } from '@/pages/modules/website-utama/public-content/slider/top-slider/hooks'
import { useEffect } from 'react'
import { format } from 'date-fns'

export const UpdatedTopSliderPage = () => {
  const form = useForm<TopSliderType>({
    resolver: zodResolver(TopSliderResolver),
  })

  const { id } = useParams()
  const { detailSlider } = UseGetSliderDetail(id ?? '')

  useEffect(() => {
    if (detailSlider) {
      form.reset({
        url: detailSlider.url,
        keterangan: detailSlider.keterangan,
        gambar: detailSlider.gambar,
        is_aktif_sampai_at: detailSlider?.is_aktif_sampai_at,
        aktif_sampai_at: format(detailSlider?.aktif_sampai_at, 'yyyy-MM-dd'),
      })
    }
  }, [detailSlider])

  const navigate = useNavigate()

  const HandlerSubmit = async (e: TopSliderType) => {
    await AxiosClient.put(`/website-utama/slider-atas/${id}`, {
      ...e,
      aktif_sampai_at: e?.aktif_sampai_at ? new Date(e.aktif_sampai_at).toISOString() : null,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data slider atas')
          navigate('/modules/website-utama/public-content/slider/top-slider')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <FormCreateSliderOnTop form={form} HandleSave={HandlerSubmit} />
      </div>
    </>
  )
}

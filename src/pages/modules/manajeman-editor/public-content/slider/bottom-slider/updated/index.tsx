import { FormCreateSliderOnTop } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/component/form.tsx'
import { useForm } from 'react-hook-form'
import { TopSliderResolver, type TopSliderType } from '../../top-slider/create/data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { UseGetBottomSliderDetail } from '../hooks/index.tsx'

export const UpdatedBottomSlider = () => {
  const form = useForm<TopSliderType>({
    resolver: zodResolver(TopSliderResolver),
  })

  const navigate = useNavigate()

  const { id } = useParams()
  const { detailSlider } = UseGetBottomSliderDetail(id ?? '')

  useEffect(() => {
    if (detailSlider) {
      form.reset({
        url: detailSlider.url,
        keterangan: detailSlider.keterangan,
        gambar: detailSlider.gambar,
      })
    }
  }, [detailSlider])

  const HandlerSubmit = async (e: TopSliderType) => {
    await AxiosClient.put(`/editor/slider-bawah/${detailSlider?.id_slider_bawah}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data slider bawah')
          navigate('/modules/editor/public-content/slider/bottom-slider')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <FormCreateSliderOnTop position={'Bawah'} form={form} HandleSave={HandlerSubmit} />
      </div>
    </>
  )
}

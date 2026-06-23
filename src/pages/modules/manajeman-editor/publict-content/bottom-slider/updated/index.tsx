import { FormCreateSliderOnTop } from '../../top-slider/component/form.tsx'
import { useForm } from 'react-hook-form'
import { TopSliderResolver, type TopSliderType } from '../../top-slider/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { UseGetSliderButtonDetailEditor } from '../hooks/index'
import { format } from 'date-fns'

export const UpdatedBottomSlider = () => {
  const form = useForm<TopSliderType>({
    resolver: zodResolver(TopSliderResolver),
  })

  const navigate = useNavigate()

  const { id } = useParams()
  const { detailSlider } = UseGetSliderButtonDetailEditor(id ?? '')

  useEffect(() => {
    if (detailSlider) {
      const temp = detailSlider?.list_unit_terkait?.map((row) => row?.id_unit)
      form.reset({
        url: detailSlider.url,
        keterangan: detailSlider.keterangan,
        gambar: detailSlider.gambar,
        is_aktif_sampai_at: detailSlider?.is_aktif_sampai_at,
        aktif_sampai_at: detailSlider?.aktif_sampai_at ? format(detailSlider.aktif_sampai_at, 'yyyy-MM-dd') : '',
        list_unit: temp,
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
          navigate('/modules/editor/dashboard')
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

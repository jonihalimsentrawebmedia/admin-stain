import { FormCreateSliderOnTop } from '../component/form.tsx'
import { useForm } from 'react-hook-form'
import { TopSliderResolver, type TopSliderType } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { UseGetSliderDetailEditor } from '../hooks'

export const UpdatedTopSliderPage = () => {
  const form = useForm<TopSliderType>({
    resolver: zodResolver(TopSliderResolver),
  })

  const { id } = useParams()
  const { detailSlider } = UseGetSliderDetailEditor(id ?? '')

  useEffect(() => {
    if (detailSlider) {
      form.reset({
        url: detailSlider.url,
        keterangan: detailSlider.keterangan,
        gambar: detailSlider.gambar,
      })
    }
  }, [detailSlider])

  const navigate = useNavigate()

  const HandlerSubmit = async (e: TopSliderType) => {
    await AxiosClient.put(`/editor/slider-atas/${id}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data slider atas')
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
        <FormCreateSliderOnTop form={form} HandleSave={HandlerSubmit} />
      </div>
    </>
  )
}

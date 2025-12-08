import { FormCreateSliderOnTop } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/component/form.tsx'
import { useForm } from 'react-hook-form'
import { TopSliderResolver, type TopSliderType } from '../../top-slider/create/data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const CreateBottomSlider = () => {
  const form = useForm<TopSliderType>({
    resolver: zodResolver(TopSliderResolver),
  })

  const navigate = useNavigate()

  const HandlerSubmit = async (e: TopSliderType) => {
    await AxiosClient.post('/website-utama/slider-bawah', {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan tambah data slider bawah')
          navigate('/modules/website-utama/public-content/slider/bottom-slider')
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

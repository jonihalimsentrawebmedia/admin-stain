import { UploadImageBasic } from '@/pages/modules/website-utama/component/UploadImage'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'
import {
  TopSliderResolver,
  type TopSliderType,
} from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const FormCreateSliderOnTop = () => {
  const form = useForm<TopSliderType>({
    resolver: zodResolver(TopSliderResolver),
  })

  const navigate = useNavigate()

  const HandlerSubmit = async (e: TopSliderType) => {
    await AxiosClient.post('/website-utama/slider-atas', {
      ...e,
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
      <div>
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(HandlerSubmit)}>
            <ButtonTitleGroup
              label={'Tambah Slider Atas'}
              buttonGroup={[
                {
                  label: 'Batal',
                  type: 'cancel',
                  onClick: () => {
                    navigate(-1)
                  },
                },
                {
                  label: 'Simpan',
                  type: 'save',
                  onClick: () => {},
                },
              ]}
            />
            <UploadImageBasic
              form={form}
              name={'gambar'}
              label={'Gambar (Ukuran 1280 x 478)'}
              placeholder={'Klik untuk mengunggah logo'}
              uploadUrl={'/upload/slider-atas'}
              required
            />

            <RichText form={form} name={'keterangan'} />

            <TextInput
              form={form}
              name={'url'}
              label={'URL (Optional)'}
              placeholder={'Masukkan URL untuk link'}
              isRow
            />
            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                {
                  label: 'Batal',
                  type: 'cancel',
                  onClick: () => {
                    navigate(-1)
                  },
                },
                {
                  label: 'Simpan',
                  type: 'save',
                  onClick: () => {},
                },
              ]}
            />
          </form>
        </Form>
      </div>
    </>
  )
}

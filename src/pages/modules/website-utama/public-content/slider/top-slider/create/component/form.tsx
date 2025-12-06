import { UploadImageBasic } from '@/pages/modules/website-utama/component/UploadImage'
import { useForm } from 'react-hook-form'

export const FormCreateSliderOnTop = () => {
  const form = useForm()

  return (
    <>
      <div>
        <UploadImageBasic
          form={form}
          name={'gambar_slider'}
          label={'Gambar (Ukuran 1280 x 478)'}
          placeholder={'Klik untuk mengunggah logo'}
          isrequired
        />
      </div>
    </>
  )
}

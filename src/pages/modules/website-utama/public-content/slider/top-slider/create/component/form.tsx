import { UploadImageBasic } from '@/pages/modules/website-utama/component/UploadImage'
import { type UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'
import { type TopSliderType } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/resolver.tsx'

interface Props {
  form: UseFormReturn<TopSliderType>
  HandleSave: (e: TopSliderType) => void
}

export const FormCreateSliderOnTop = (props: Props) => {
  const { form, HandleSave } = props
  const navigate = useNavigate()

  return (
    <>
      <div>
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(HandleSave)}>
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

import { UploadImageBasic } from '@/pages/modules/website-utama/component/UploadImage'
import { type UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'
import { SwitchInput } from '@/components/common/form/switchInput.tsx'
import type { TopSliderType } from '@/pages/modules/new_editor/publict-content/top-slider/data/resolver.tsx'

interface Props {
  form: UseFormReturn<TopSliderType>
  HandleSave: (e: TopSliderType) => void
  position?: string
}

export const FormCreateSliderOnTop = (props: Props) => {
  const { form, HandleSave, position = 'Atas' } = props
  const navigate = useNavigate()

  return (
    <>
      <div>
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(HandleSave)}>
            <ButtonTitleGroup
              label={`Tambah Slider ${position}`}
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
              inputClassName={'bg-white'}
              placeholder={'Masukkan URL untuk link'}
              isRow
            />

            <SwitchInput
              form={form}
              name={'is_aktif_sampai_at'}
              label={'Ada Batas Waktu Aktif?'}
              fx={() => {
                form.setValue('aktif_sampai_at', '')
              }}
              isRow
              isRequired
            />

            <TextInput
              isDisabled={!form.watch('is_aktif_sampai_at')}
              name={'aktif_sampai_at'}
              form={form}
              label={'Aktif Sampai Pada'}
              type={'date'}
              inputClassName={'w-1/2 bg-white'}
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

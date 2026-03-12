import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { MainServiceType } from '../data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'

interface Props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<MainServiceType>
  HandleSave: (e: MainServiceType) => void
}

export const FormMainService = (props: Props) => {
  const { loading, open, setOpen, form, HandleSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <UploadImageRatio
            name={'url_gambar'}
            form={form}
            maxWidthClassName={'max-w-[160px]'}
            aspectRatioHeight={1}
            aspectRatioWidth={1}
            label={'Icon Layanan'}
            placeholder={'Icon Layanan'}
            required
          />

          <TextInput
            form={form}
            name={'nama_layanan'}
            label={'Nama Layanan'}
            placeholder={'Nama Layanan'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'uraian_singkat'}
            label={'Uraian Singkat'}
            placeholder={'Uraian Singkat'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'url'}
            label={'URL'}
            placeholder={'URL'}
            type={'url'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'urutan'}
            label={'urutan'}
            placeholder={'urutan'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

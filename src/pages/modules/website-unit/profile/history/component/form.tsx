import type { UseFormReturn } from 'react-hook-form'
import type { HistoryResolverType } from '@/pages/modules/website-unit/profile/history/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'

interface FormProps {
  form: UseFormReturn<HistoryResolverType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleSave: (e: HistoryResolverType) => void
}

export const FormHistoryUnit = (props: FormProps) => {
  const { form, loading, open, setOpen, handleSave } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
          <UploadImageRatio
            name={'gambar_url'}
            form={form}
            aspectRatioHeight={3}
            aspectRatioWidth={4}
            maxWidthClassName={'max-w-[240px] w-full'}
            label={'Gambar'}
            placeholder={'Pilih gambar'}
            required
          />
          <TextInput name={'nama_unit'} isDisabled isRow label={'Pilih Unit'} form={form} />

          <TextInput
            name={'urutan'}
            label={'Urutan'}
            form={form}
            type={'number'}
            placeholder={'Urutan'}
            isRequired
            isNumber
            isRow
          />
          <TextInput
            name={'tahun'}
            label={'Tahun'}
            form={form}
            placeholder={'Tahun'}
            type={'number'}
            isRow
            isRequired
          />
          <TextAreaInput
            name={'isi_sejarah'}
            form={form}
            label={'Isi Sejarah'}
            placeholder={'Isi Sejarah'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

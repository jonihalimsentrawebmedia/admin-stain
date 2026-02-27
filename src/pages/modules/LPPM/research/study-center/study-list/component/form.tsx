import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { SchemaStudyCenter } from '@/pages/modules/LPPM/research/study-center/study-list/data/reasolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

interface FormProps {
  form: UseFormReturn<SchemaStudyCenter>
  loading: boolean
  HandleSave: (data: SchemaStudyCenter) => void
  label: string
}

export const FormStudyCenter = (props: FormProps) => {
  const { form, label, loading, HandleSave } = props

  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={label}
            isBack
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate(-1),
              },
              {
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <TextInput
            name={'judul'}
            form={form}
            label={'Judul'}
            placeholder={'Judul'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />
          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            inputClassName={'bg-white'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <RichText form={form} name={'deskripsi'} isRow label={'Deskripsi'} required />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

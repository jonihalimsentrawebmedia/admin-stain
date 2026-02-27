import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { schemaDRTPM } from '../data/resolver'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

interface FormProps {
  form: UseFormReturn<schemaDRTPM>
  loading: boolean
  HandleSave: (data: schemaDRTPM) => void
  label: string
}

export const FormDataDRTPM = (props: FormProps) => {
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

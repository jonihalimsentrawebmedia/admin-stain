import type { UseFormReturn } from 'react-hook-form'
import type { SchemaActivity } from '../data/resolver'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

interface FormProps {
  form: UseFormReturn<SchemaActivity>
  HandleSave: (data: SchemaActivity) => void
  loading: boolean
}

export const FormActivity = (props: FormProps) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Tambah Program Kegiatan'}
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
            form={form}
            name={'judul'}
            label={'Judul'}
            placeholder={'Judul'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            inputClassName={'bg-white'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <RichText
            form={form}
            name={'deskripsi'}
            isRow
            required
            label={'Deskripsi'}
            showLabel={true}
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

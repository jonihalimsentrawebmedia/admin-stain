import type { UseFormReturn } from 'react-hook-form'
import type { TResolverTypeTemplateLetter } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SwitchInput } from '@/components/common/form/switchInput.tsx'

interface props {
  form: UseFormReturn<TResolverTypeTemplateLetter>
  loading: boolean
  HandleSave: (value: TResolverTypeTemplateLetter) => void
  open: boolean
  setOpen: (value: boolean) => void
}

const FormTypeTemplate = (props: props) => {
  const { form, loading, HandleSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'nama_jenis_template'}
            label={'Nama Jenis Surat'}
            htmlFor={'nama_jeni_template'}
            placeholder={'Nama Jenis Surat'}
            isRequired
          />
          <TextInput
            name={'kode_template'}
            form={form}
            label={'Kode Template'}
            placeholder={'Kode Template'}
            htmlFor={'kode_template'}
            isRequired
          />
          <SwitchInput
            label={'Is Existing Template'}
            htmlFor={'is'}
            form={form}
            name={'is_existing_template'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            htmlFor={'urutan'}
            placeholder={'Urutan'}
            type={'number'}
            isNumber
            isRequired
          />
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}
export default FormTypeTemplate

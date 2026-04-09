import type { UseFormReturn } from 'react-hook-form'
import type { TResolverRegulation } from '../data/resolver'
import { Form } from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  form: UseFormReturn<TResolverRegulation>
  loading: boolean
  HandleSave: (e: TResolverRegulation) => void
}

export const FormServiceSPI = (props: Props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'nama_peraturan'}
            label={'Nama Peraturan'}
            placeholder={'Nama Peraturan'}
            inputClassName={'bg-white'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'url'}
            label={'URL'}
            placeholder={'URL Dokumen Peraturan'}
            inputClassName={'bg-white'}
            type={'url'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            inputClassName={'bg-white'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

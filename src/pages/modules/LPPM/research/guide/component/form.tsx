import type { UseFormReturn } from 'react-hook-form'
import type { SchemaGuideCategory } from '../data/resolver'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { Dispatch, SetStateAction } from 'react'

interface FormProps {
  form: UseFormReturn<SchemaGuideCategory>
  handleSubmit: (data: SchemaGuideCategory) => void
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const FormResearchGuideCategory = (props: FormProps) => {
  const { form, handleSubmit, loading, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInput
            placeholder={'Nama Kategori'}
            name={'nama_kategori'}
            form={form}
            label={'Nama Kategori'}
            isRequired
            isRow
          />

          <TextInput
            placeholder={'Urutan'}
            name={'urutan'}
            form={form}
            label={'Urutan'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

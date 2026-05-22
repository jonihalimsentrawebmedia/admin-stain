import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverLetterClassification } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverLetterClassification>
  HandleSave: (e: TResolverLetterClassification) => void
}

export const FormLetterClassification = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          {form?.watch('nama_parent') && (
            <TextInput
              name={'nama_parent'}
              form={form}
              label={'Nama Parent'}
              placeholder={'Nama Parent'}
              htmlFor={'kode'}
              isRequired
              isDisabled
            />
          )}

          <TextInput
            name={'kode_klasifikasi'}
            form={form}
            label={'Kode Klasifikasi'}
            placeholder={'Kode Klasifikasi'}
            htmlFor={'kode'}
            isRequired
          />

          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Klasifikasi'}
            placeholder={'Nama Klasifikasi'}
            htmlFor={'nama'}
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverLetterOrigin } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverLetterOrigin>
  HandleSave: (e: TResolverLetterOrigin) => void
}

export const FormLetterOrigin = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <TextInput
            name={'instansi'}
            form={form}
            label={'Instansi'}
            placeholder={'instansi'}
            htmlFor={'instansi'}
            isRequired
          />

          <TextAreaInput
            name={'alamat'}
            form={form}
            label={'Alamat'}
            placeholder={'Alamat'}
            htmlFor={'nama'}
            isRequired
          />

          <TextInput
            name={'telepon'}
            form={form}
            label={'Telepon (Opsional)'}
            placeholder={'Telepon'}
            htmlFor={'Telepon'}
            type={'number'}
          />

          <TextInput
            name={'email'}
            form={form}
            label={'Email (Opsional)'}
            placeholder={'Email'}
            htmlFor={'email'}
            type={'email'}
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

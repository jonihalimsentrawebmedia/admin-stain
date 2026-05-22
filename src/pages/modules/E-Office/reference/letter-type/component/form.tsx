import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverLetterType } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverLetterType>
  HandleSave: (e: TResolverLetterType) => void
}

export const FormLetterType = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <TextInput
            name={'nama'}
            form={form}
            label={'Keterangan'}
            placeholder={'Keterangan'}
            htmlFor={'nama'}
            isRequired
          />

          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            htmlFor={'urutan'}
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

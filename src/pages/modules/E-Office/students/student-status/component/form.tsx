import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverStudentStatus } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverStudentStatus>
  HandleSave: (e: TResolverStudentStatus) => void
}

export const FormStudentStatus = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <TextInput
            name={'kode'}
            form={form}
            label={'Kode'}
            placeholder={'Kode'}
            htmlFor={'kode'}
            isRequired
          />

          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Status'}
            placeholder={'Nama Status'}
            htmlFor={'nama'}
            isRequired
          />
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

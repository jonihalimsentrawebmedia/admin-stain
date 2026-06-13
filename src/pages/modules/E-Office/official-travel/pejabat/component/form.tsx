import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverPejabat>
  HandleSave: (e: TResolverPejabat) => void
}

export const FormPejabat = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <TextInput
            name={'nip'}
            form={form}
            label={'NIP'}
            placeholder={'NIP'}
            htmlFor={'nip'}
            isRequired
          />

          <TextInput
            name={'nama_lengkap'}
            form={form}
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap'}
            htmlFor={'nama_lengkap'}
            isRequired
          />

          <TextInput
            name={'golongan'}
            form={form}
            label={'Golongan'}
            placeholder={'Golongan'}
            htmlFor={'golongan'}
            isRequired
          />

          <TextInput
            name={'jabatan'}
            form={form}
            label={'Jabatan'}
            placeholder={'Jabatan'}
            htmlFor={'jabatan'}
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

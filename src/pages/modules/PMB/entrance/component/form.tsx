import type { UseFormReturn } from 'react-hook-form'
import type { TResolverEntrance } from '@/pages/modules/PMB/entrance/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'

interface Props {
  form: UseFormReturn<TResolverEntrance>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: TResolverEntrance) => void
}

export const FormEntrance = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <Form {...form}>
      <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
        <TextInput
          name={'nama_jalur'}
          form={form}
          label={'Nama Jalur Pendaftaran'}
          placeholder={'Nama Jalur Pendaftaran'}
          isRequired
          isRow
        />
        <TextInput
          name={'url_pendaftaran'}
          form={form}
          label={'URL Pendaftaran'}
          placeholder={'URL Pendaftaran'}
          isRow
          isRequired
          type={'url'}
        />

        <TextInput
          name={'urutan'}
          form={form}
          label={'Urutan'}
          placeholder={'Urutan'}
          isRow
          isRequired
          isNumber
          type={'number'}
        />
        <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
      </form>
    </Form>
  )
}

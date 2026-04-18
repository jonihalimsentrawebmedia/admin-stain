import type { UseFormReturn } from 'react-hook-form'
import type { TResolverPublication } from '../data/resolver'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  form: UseFormReturn<TResolverPublication>
  loading: boolean
  HandlerSave: (e: TResolverPublication) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export const FormListPublication = (props: props) => {
  const { form, loading, HandlerSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            form={form}
            name={'nama_publikasi'}
            label={'Judul Publikasi'}
            placeholder={'Judul Publikasi'}
            htmlFor={'nama_publikasi'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'penulis'}
            label={'Penulis'}
            placeholder={'Penulis'}
            htmlFor={'penulis'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'link'}
            label={'Link'}
            placeholder={'Link Url Publikasi'}
            htmlFor={'link'}
            type={'url'}
            isRow
            isRequired
          />
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

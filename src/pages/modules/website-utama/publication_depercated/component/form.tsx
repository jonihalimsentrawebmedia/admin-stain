import type { UseFormReturn } from 'react-hook-form'
import type { TResolverPublication } from '@/pages/modules/website-utama/publication_depercated/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface FormProps {
  form: UseFormReturn<TResolverPublication>
  loading: boolean
  HandlerSave: (e: TResolverPublication) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const FormPublication = (props: FormProps) => {
  const { form, loading, HandlerSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'nama_tahun_publikasi'}
            form={form}
            label={'Tahun Publikasi'}
            placeholder={'Masukkan Tahun Publikasi'}
            htmlFor={'nama_tahun_publikasi'}
            isRequired
            isRow
          />
          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Masukkan Urutan'}
            htmlFor={'urutan'}
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

export default FormPublication

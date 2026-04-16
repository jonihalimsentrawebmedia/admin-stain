import type { UseFormReturn } from 'react-hook-form'
import type { TResolverUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface FormProps {
  form: UseFormReturn<TResolverUkkUkm>
  loading: boolean
  HandlerSave: (e: TResolverUkkUkm) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const FormUkkUkm = (props: FormProps) => {
  const { form, loading, HandlerSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'nama_ukk_ukm'}
            form={form}
            label={'Nama UKK/UKM'}
            placeholder={'Masukkan Nama UKK/UKM'}
            htmlFor={'nama_ukk_ukm'}
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

export default FormUkkUkm

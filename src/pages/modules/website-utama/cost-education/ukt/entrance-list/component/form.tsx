import type { UseFormReturn } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { TUktEntranceUkt } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/data/resolver.tsx'

interface props {
  open: boolean
  setOpen: (value: boolean) => void
  form: UseFormReturn<TUktEntranceUkt>
  loading: boolean
  HandlerSave: (value: TUktEntranceUkt) => void
}

export const FormEntranceUkt = (props: props) => {
  const { form, loading, HandlerSave, open, setOpen } = props

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandlerSave)} className={'flex flex-col gap-5'}>
          <TextInput
            name={'nama_jalur_masuk'}
            form={form}
            label={'Nama Jalur Masuk UKT'}
            placeholder={'Masukkan Jalur Masuk UKT'}
            htmlFor={'nama_tingkatan_ukt'}
            isRow
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
            isRow
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

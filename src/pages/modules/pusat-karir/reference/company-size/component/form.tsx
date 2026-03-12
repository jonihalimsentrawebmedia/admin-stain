import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { ICompanySizeResolver } from '@/pages/modules/pusat-karir/reference/company-size/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<ICompanySizeResolver>
  open: boolean
  setOpen: (value: boolean) => void
  HandlerSave: (e: ICompanySizeResolver) => void
}

export const CompanySizeForm = (props: Props) => {
  const { loading, form, open, setOpen, HandlerSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'jumlah_terendah'}
            form={form}
            placeholder={'Jumlah Karyawan (Paling Sedikit)'}
            label={'Jumlah Karyawan (Paling Sedikit)'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <TextInput
            name={'jumlah_teratas'}
            form={form}
            placeholder={'Jumlah Karyawan (Paling Banyak)'}
            label={'Jumlah Karyawan (Paling Banyak)'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
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

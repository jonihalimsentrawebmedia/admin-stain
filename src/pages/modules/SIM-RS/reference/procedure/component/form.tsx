import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { IProcedureResolver } from '@/pages/modules/SIM-RS/reference/procedure/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<IProcedureResolver>
  open: boolean
  setOpen: (value: boolean) => void
  HandlerSave: (e: IProcedureResolver) => void
}

export const ProcedureForm = (props: Props) => {
  const { loading, form, open, setOpen, HandlerSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'kode'}
            form={form}
            placeholder={'Masukkan Kode ICD-9-CM'}
            label={'Kode ICD-9-CM'}
            isRequired
            isRow
          />

          <TextInput
            name={'nama'}
            form={form}
            placeholder={'Masukkan Nama Tindakan'}
            label={'Nama Tindakan'}
            isRequired
            isRow
          />

          <TextInput
            name={'deskripsi'}
            form={form}
            placeholder={'Masukkan Deskripsi Tindakan'}
            label={'Deskripsi'}
            isRequired
            isRow
          />

          <CurrencyInput
            name={'harga'}
            form={form}
            label={'Harga'}
            placeholder={'Masukkan Harga'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

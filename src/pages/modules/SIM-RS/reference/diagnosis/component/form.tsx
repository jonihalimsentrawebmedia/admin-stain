import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { IDiagnosisResolver } from '@/pages/modules/SIM-RS/reference/diagnosis/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<IDiagnosisResolver>
  open: boolean
  setOpen: (value: boolean) => void
  HandlerSave: (e: IDiagnosisResolver) => void
}

export const DiagnosisForm = (props: Props) => {
  const { loading, form, open, setOpen, HandlerSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'kode'}
            form={form}
            placeholder={'Masukkan Kode ICD-10'}
            label={'Kode ICD-10'}
            isRequired
            isRow
          />

          <TextInput
            name={'nama'}
            form={form}
            placeholder={'Masukkan Nama Diagnosis'}
            label={'Nama Diagnosis'}
            isRequired
            isRow
          />

          <TextInput
            name={'deskripsi'}
            form={form}
            placeholder={'Masukkan Deskripsi Diagnosis'}
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

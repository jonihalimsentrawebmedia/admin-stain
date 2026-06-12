import type { UseFormReturn } from 'react-hook-form'
import type { TBudgetSchema } from '@/pages/modules/E-Office/official-travel/budget/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'

interface FormProps {
  form: UseFormReturn<TBudgetSchema>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
  HandleSave: (e: TBudgetSchema) => void
}

const FormBudget = (props: FormProps) => {
  const { form, open, setOpen, loading, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'tahun_anggaran'}
            form={form}
            label={'Tahun Anggaran'}
            placeholder={'Masukkan Tahun Anggaran'}
            type={'number'}
            htmlFor={'tahun'}
            isNumber
            isRequired
          />
          <TextInput
            name={'sumber_data'}
            form={form}
            label={'Sumber Dana'}
            placeholder={'Sumber Dana'}
            htmlFor={'tahun'}
            isRequired
          />
          <CurrencyInput
            form={form}
            name={'jumlah_anggaran'}
            label={'Jumlah Anggaran'}
            placeholder={'Masukkan Jumlah Anggaran'}
            currency={'IDR'}
            locale={'id-ID'}
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

export default FormBudget

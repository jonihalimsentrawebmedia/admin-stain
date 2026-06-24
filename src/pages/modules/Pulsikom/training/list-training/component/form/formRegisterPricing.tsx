import type { UseFormReturn } from 'react-hook-form'
import type { TResolverPricing } from '../../data/resolver'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'

interface props {
  open: boolean
  setOpen: (value: boolean) => void
  HandleSave: (value: any) => void
  form: UseFormReturn<TResolverPricing>
  loading: boolean
}

export const FormRegisterPricing = (props: props) => {
  const { open, setOpen, loading, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'nama_biaya'}
            form={form}
            label={'Nama Biaya'}
            placeholder={'Judul Topik Bahasan'}
            isRequired
            isRow
          />
          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />
          <CurrencyInput
            name={'harga'}
            form={form}
            label={'harga (Rp.)'}
            locale={'id-ID'}
            currency={'IDR'}
            isRequired
            isRow
          />
          <TextAreaInput name={'keuntungan'} form={form} label={'Keuntungan'} isRequired isRow />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

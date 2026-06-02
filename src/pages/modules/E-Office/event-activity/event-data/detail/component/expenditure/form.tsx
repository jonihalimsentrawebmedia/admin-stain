import type { UseFormReturn } from 'react-hook-form'
import type { TResolverExpenditure } from './resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'

interface props {
  form: UseFormReturn<TResolverExpenditure>
  loading: boolean
  open: boolean
  setOpen: (e: boolean) => void
  HandleSave: (e: TResolverExpenditure) => void
}

export const FormExpenditure = (props: props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'uraian_pengeluaran'}
            label={'Uraian Pengeluaran'}
            placeholder={'Uraian Pengeluaran'}
            htmlFor={'uraian_pengeluaran'}
            isRequired
          />

          <TextInput
            form={form}
            name={'tanggal_pengeluaran'}
            label={'Tanggal'}
            htmlFor={'Tanggal'}
            type={'date'}
            isRequired
          />

          <TextInput
            form={form}
            name={'yang_membayar'}
            label={'Yang Membayarkan'}
            placeholder={'Yang Membayarkan'}
            htmlFor={'yang_membayar'}
            isRequired
          />
          <TextInput
            form={form}
            name={'tempat_pembelian'}
            label={'Tempat Pembelian / Toko'}
            placeholder={'Nama Tempat Pembelian / Toko'}
            htmlFor={'tempat_pembelian'}
            isRequired
          />
          <CurrencyInput
            name={'jumlah_pengeluaran'}
            form={form}
            label={'Jumlah Pengeluaran'}
            placeholder={'Jumlah Pengeluaran'}
            currency={'IDR'}
            locale={'id-ID'}
            isRequired
          />
          <UploadFileInput
            form={form}
            name={'url_file_pengeluaran'}
            keyname={'key_url_file_pengeluaran'}
            label={'Upload Bukti Pembayaran'}
            accept={'image/*'}
            required
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

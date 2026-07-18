import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { IMedicineResolver } from '@/pages/modules/SIM-RS/pharmacy/medicine/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import {
  kategoriObatData,
  bentukSediaanData,
  satuanData,
} from '../data/resolver.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<IMedicineResolver>
  open: boolean
  setOpen: (value: boolean) => void
  HandlerSave: (e: IMedicineResolver) => void
}

export const MedicineForm = (props: Props) => {
  const { loading, form, open, setOpen, HandlerSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'nama_obat'}
            form={form}
            placeholder={'Masukkan Nama Obat'}
            label={'Nama Obat'}
            isRequired
            isRow
          />

          <SelectBasicInput
            name={'kategori_obat'}
            isRow
            form={form}
            label={'Kategori Obat'}
            placeholder={'Pilih Kategori'}
            data={kategoriObatData}
            usePortal
            isRequired
          />

          <SelectBasicInput
            name={'bentuk_sediaan'}
            form={form}
            label={'Bentuk Sediaan'}
            placeholder={'Pilih Bentuk Sediaan'}
            data={bentukSediaanData}
            usePortal
            isRow
            isRequired
          />

          <SelectBasicInput
            name={'satuan'}
            form={form}
            label={'Satuan'}
            placeholder={'Pilih Satuan'}
            data={satuanData}
            usePortal
            isRow
            isRequired
          />

          <CurrencyInput
            name={'harga'}
            form={form}
            label={'Harga'}
            placeholder={'Masukkan Harga'}
            isRequired
            isRow
          />

          <TextInput
            name={'deskripsi'}
            form={form}
            placeholder={'Masukkan Deskripsi'}
            label={'Deskripsi'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

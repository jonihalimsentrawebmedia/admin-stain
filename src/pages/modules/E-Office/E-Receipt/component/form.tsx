import type { UseFormReturn } from 'react-hook-form'
import type { TEreceiptSchema } from '@/pages/modules/E-Office/E-Receipt/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ColorPicker from '@/pages/modules/E-Office/component/common/inputColorPicker.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'

interface FormProps {
  form: UseFormReturn<TEreceiptSchema>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
  HandleSave: (e: TEreceiptSchema) => void
}

const FormEreceipt = (props: FormProps) => {
  const { form, open, setOpen, loading, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'grid grid-cols-2 gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'no_kwitansi'}
            form={form}
            label={'No. Kwitansi'}
            placeholder={'Masukkan No. Kwitansi'}
            htmlFor={'no_kwitansi'}
            isRequired
          />
          <TextInput
            name={'tanggal'}
            form={form}
            label={'Tanggal'}
            placeholder={'Pilih Tanggal'}
            htmlFor={'tanggal'}
            type={'date'}
            isRequired
          />
          <TextInput
            name={'nama_penerima'}
            form={form}
            label={'Nama Penerima'}
            placeholder={'Masukkan Nama Penerima'}
            htmlFor={'nama_penerima'}
            isRequired
          />
          <TextInput
            name={'nama_penyetor'}
            form={form}
            label={'Nama Penyetor'}
            placeholder={'Masukkan Nama Penyetor'}
            htmlFor={'nama_penyetor'}
            isRequired
          />
          <div className="col-span-2">
            <ColorPicker
              colors={[
                { value: '#feb019', label: 'Kuning' },
                { value: '#0c3d88', label: 'Biru' },
                { value: '#bb0026', label: 'Merah' },
                { value: '#11e11a', label: 'Hijau' },
              ]}
              label={'Warna'}
              value={form.watch('warna')}
              onChange={(e) => {
                form.setValue('warna', e)
              }}
            />
          </div>
          <CurrencyInput
            form={form}
            name={'jumlah'}
            label={'Jumlah'}
            placeholder={'Masukkan Jumlah'}
            currency={'IDR'}
            locale={'id-ID'}
            isRequired
          />
          <TextInput
            name={'keterangan'}
            form={form}
            label={'Keterangan'}
            placeholder={'Masukkan Keterangan'}
            htmlFor={'keterangan'}
          />

          <div className="col-span-2">
            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </div>
        </form>
      </Form>
    </>
  )
}

export default FormEreceipt

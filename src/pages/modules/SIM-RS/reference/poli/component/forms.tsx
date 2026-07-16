import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import type { TResolverPoliCreate, TResolverPoliUpdate } from '../data/resolver.tsx'

interface PropsCreate {
  loading: boolean
  form: UseFormReturn<TResolverPoliCreate>
  HandleSave: (e: TResolverPoliCreate) => void
}

interface PropsUpdate {
  loading: boolean
  form: UseFormReturn<TResolverPoliUpdate>
  HandleSave: (e: TResolverPoliUpdate) => void
}

const statusData = [
  { label: 'Aktif', value: 'true' },
  { label: 'Tidak Aktif', value: 'false' },
]

export const FormPoliCreate = (props: PropsCreate) => {
  const { loading, form, HandleSave } = props

  return (
    <Form {...form}>
      <form className={'mt-5 w-full flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Poli'}
            placeholder={'Masukkan Nama Poli'}
            htmlFor={'nama'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
          <TextInput
            name={'lokasi'}
            form={form}
            label={'Lokasi'}
            placeholder={'Masukkan Lokasi'}
            htmlFor={'lokasi'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}

export const FormPoliUpdate = (props: PropsUpdate) => {
  const { loading, form, HandleSave } = props

  return (
    <Form {...form}>
      <form className={'mt-5 w-full flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Poli'}
            placeholder={'Masukkan Nama Poli'}
            htmlFor={'nama'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
          <TextInput
            name={'lokasi'}
            form={form}
            label={'Lokasi'}
            placeholder={'Masukkan Lokasi'}
            htmlFor={'lokasi'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
          <SelectBasicInput
            name={'is_status'}
            form={form}
            label={'Status'}
            placeholder={'Pilih Status'}
            data={statusData}
            className={'col-span-1'}
            usePortal
            isRequired
          />
          <TextInput
            name={'tanggal'}
            form={form}
            label={'Tanggal & Waktu'}
            type={'datetime-local'}
            htmlFor={'tanggal'}
            className={'col-span-1'}
            inputClassName={'bg-gray-100'}
            isRequired
            isDisabled
          />
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}

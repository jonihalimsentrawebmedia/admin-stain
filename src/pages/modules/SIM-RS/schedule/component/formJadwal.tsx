import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { TResolverJadwal } from '../data/resolver.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<TResolverJadwal>
  HandleSave: (e: TResolverJadwal) => void
}

const hariData = [
  { label: 'Senin', value: '1' },
  { label: 'Selasa', value: '2' },
  { label: 'Rabu', value: '3' },
  { label: 'Kamis', value: '4' },
  { label: 'Jumat', value: '5' },
  { label: 'Sabtu', value: '6' },
  { label: 'Minggu', value: '7' },
]

export const FormJadwal = (props: Props) => {
  const { loading, form, HandleSave } = props

  return (
    <Form {...form}>
      <form className={'w-full flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-2 gap-4">
          <SelectBasicInput
            name={'hari'}
            form={form}
            label={'Hari'}
            placeholder={'Pilih Hari'}
            data={hariData}
            className={'col-span-2'}
            usePortal
            isRequired
          />
          <TextInput
            name={'jam_mulai'}
            form={form}
            label={'Jam Mulai'}
            type={'time'}
            htmlFor={'jam_mulai'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <TextInput
            name={'jam_selesai'}
            form={form}
            label={'Jam Selesai'}
            type={'time'}
            htmlFor={'jam_selesai'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}
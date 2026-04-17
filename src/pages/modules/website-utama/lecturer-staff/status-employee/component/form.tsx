import TextInput from '@/components/common/form/TextInput.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { TStatusEmployeeResolver } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface Props {
  form: UseFormReturn<TStatusEmployeeResolver>
  loading: boolean
  HandlerSave: (e: TStatusEmployeeResolver) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export const FormEmployeeStatus = (props: Props) => {
  const { form, loading, HandlerSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'kode_status'}
            form={form}
            label={'Kode Status'}
            placeholder={'Masukkan Kode Status'}
            htmlFor={'kode_status'}
            isRequired
            isRow
          />
          <TextInput
            name={'nama_status'}
            form={form}
            label={'Nama Status'}
            placeholder={'Masukkan Nama Status'}
            htmlFor={'nama_status'}
            isRequired
            isRow
          />
          <InputRadio
            form={form}
            name={'is_ada_nidn'}
            label={'Ada NIDN ?'}
            isRequired
            isRow
            data={[
              { value: true, label: 'Ya' },
              { value: false, label: 'Tidak' },
            ]}
          />

          <InputRadio
            form={form}
            name={'is_dosen'}
            label={'Jenis Status'}
            isRequired
            isRow
            data={[
              { value: true, label: 'Dosen' },
              { value: false, label: 'Staff' },
            ]}
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { ISumberBiayaResolver } from '@/pages/modules/SIM-RS/reference/source-medical-treatment/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SwitchInput } from '@/components/common/form/switchInput.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<ISumberBiayaResolver>
  open: boolean
  setOpen: (value: boolean) => void
  HandlerSave: (e: ISumberBiayaResolver) => void
}

export const SumberBiayaForm = (props: Props) => {
  const { loading, form, open, setOpen, HandlerSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'kode'}
            form={form}
            placeholder={'Masukkan Kode'}
            label={'Kode'}
            isRequired
            isRow
          />

          <TextInput
            name={'nama'}
            form={form}
            placeholder={'Masukkan Nama'}
            label={'Nama'}
            isRequired
            isRow
          />

          <SwitchInput
            name={'is_ada_nomor_peserta'}
            form={form}
            label={'Ada Nomor Peserta'}
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

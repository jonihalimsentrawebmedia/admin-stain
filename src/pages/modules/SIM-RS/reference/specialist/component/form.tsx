import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { ISpecialistResolver } from '@/pages/modules/SIM-RS/reference/specialist/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<ISpecialistResolver>
  open: boolean
  setOpen: (value: boolean) => void
  HandlerSave: (e: ISpecialistResolver) => void
}

export const SpecialistForm = (props: Props) => {
  const { loading, form, open, setOpen, HandlerSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'nama'}
            form={form}
            placeholder={'Masukkan Nama Spesialis'}
            label={'Nama Spesialis'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

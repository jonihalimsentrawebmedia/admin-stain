import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { IRoomTypeResolver } from '@/pages/modules/SIM-RS/reference/room-type/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<IRoomTypeResolver>
  open: boolean
  setOpen: (value: boolean) => void
  HandlerSave: (e: IRoomTypeResolver) => void
}

export const RoomTypeForm = (props: Props) => {
  const { loading, form, open, setOpen, HandlerSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            name={'nama'}
            form={form}
            placeholder={'Masukkan Nama Jenis Ruangan'}
            label={'Nama Jenis Ruangan'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

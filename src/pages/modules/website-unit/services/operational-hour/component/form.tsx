import type { UseFormReturn } from 'react-hook-form'
import type { OperatingHourType } from '@/pages/modules/website-unit/services/operational-hour/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  form: UseFormReturn<OperatingHourType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: OperatingHourType) => void
}

export const FormOperationalHour = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'hari'}
            label={'Hari'}
            placeholder={'Hari'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'jam_operasional'}
            label={'Jam Operasional'}
            placeholder={'Jam Operasional'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

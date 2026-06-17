import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverReminderAgenda } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverReminderAgenda>
  HandleSave: (e: TResolverReminderAgenda) => void
}

export const FormReminderAgenda = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <TextInput
              name={'waktu'}
              form={form}
              label={'Waktu'}
              placeholder={'Waktu (dalam menit)'}
              htmlFor={'nama'}
              type={'number'}
              className={'flex!'}
              isRow
              isNumber
              isRequired
            />
            <p className="text-primary text-sm">Menit Sebelum Dimulai</p>
          </div>
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

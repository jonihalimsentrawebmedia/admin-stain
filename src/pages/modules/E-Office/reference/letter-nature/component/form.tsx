import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverLetterNature } from '@/pages/modules/E-Office/reference/letter-nature/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ColorPicker from '@/pages/modules/E-Office/component/common/inputColorPicker.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverLetterNature>
  HandleSave: (e: TResolverLetterNature) => void
}

export const FormLetterNature = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <TextInput
            name={'kode'}
            form={form}
            label={'Kode'}
            placeholder={'Kode'}
            htmlFor={'kode'}
            isRequired
          />

          <TextInput
            name={'nama'}
            form={form}
            label={'Keterangan'}
            placeholder={'Keterangan'}
            htmlFor={'nama'}
            isRequired
          />

          <ColorPicker
            label={'Warna'}
            value={form.watch('warna')}
            onChange={(e) => {
              form.setValue('warna', e)
            }}
          />

          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            htmlFor={'urutan'}
            type={'number'}
            isNumber
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

import type { Dispatch, SetStateAction } from 'react'
import { type OurTeamResolverType } from '../data/resolver'

import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface FormProps {
  form: UseFormReturn<OurTeamResolverType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleSave: (e: OurTeamResolverType) => void
}

export const FormOurTeamUnit = (props: FormProps) => {
  const { form, loading, open, setOpen, handleSave } = props

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
          <TextInput name={'nama_unit'} isDisabled isRow label={'Pilih Unit'} form={form} />

          <TextInput
            name={'nama_divisi'}
            label={'Nama Divisi'}
            form={form}
            placeholder={'Nama Divisi'}
            isRequired
            isRow
          />

          <TextInput
            name={'urutan'}
            label={'Urutan'}
            form={form}
            type={'number'}
            placeholder={'Urutan'}
            isRequired
            isNumber
            isRow
          />
          
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          
        </form>
      </Form>
    </>
  )
}

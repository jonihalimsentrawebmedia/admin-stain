import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { FooterServiceType } from '../data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface Props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<FooterServiceType>
  HandleSave: (e: FooterServiceType) => void
}

export const FormServiceFooter = (props: Props) => {
  const { loading, open, setOpen, form, HandleSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'nama_layanan'}
            label={'Nama Layanan'}
            placeholder={'Nama Layanan'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'url'}
            label={'URL'}
            placeholder={'URL'}
            type={'url'}
            isRow
            isRequired
          />

          <InputRadio
            form={form}
            name={'is_footer'}
            label={'Posisi Footer'}
            isRequired
            isRow
            data={[
              { value: true, label: 'Aktif' },
              { value: false, label: 'Tidak Aktif' },
            ]}
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

import type { UseFormReturn } from 'react-hook-form'
import type { IResolverHeaderFooter } from '../data/resolver'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import { Label } from '@/components/ui/label.tsx'

interface Props {
  form: UseFormReturn<IResolverHeaderFooter>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: IResolverHeaderFooter) => void
}

export const FormHeaderFooter = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'nama_layanan'}
            form={form}
            label={'Nama Layanan'}
            placeholder={'Nama Layanan'}
            isRequired
            isRow
          />
          <TextInput
            name={'url'}
            type={'url'}
            form={form}
            label={'URL Layanan'}
            placeholder={'URL Layanan'}
            isRequired
            isRow
          />

          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <Label className={'text-gray-500'}>
              Posisi Aktif <span className={'text-red-500'}>*</span>
            </Label>
            <div className="flex items-center gap-2">
              <CheckboxInputBasic name={'is_header'} label={'Header'} form={form} />
              <CheckboxInputBasic name={'is_footer'} label={'Footer'} form={form} />
            </div>
          </div>

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

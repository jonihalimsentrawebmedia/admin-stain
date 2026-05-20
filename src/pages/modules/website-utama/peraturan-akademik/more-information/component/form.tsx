import type { UseFormReturn } from 'react-hook-form'
import type { TResolverMoreInformation } from '../data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { RichText } from '@/components/common/richtext'

interface props {
  form: UseFormReturn<TResolverMoreInformation>
  loading: boolean
  HandlerSave: (e: TResolverMoreInformation) => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const FormMoreInformation = (props: props) => {
  const { form, loading, HandlerSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <TextInput
            form={form}
            name={'judul'}
            label={'Judul'}
            placeholder={'Masukkan Judul'}
            htmlFor={'judul'}
            isRequired
          />
          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Tulisan Urutan'}
            htmlFor={'judul'}
            type={'number'}
            isNumber
            isRequired
          />
          <InputRadio
            form={form}
            name={'publish'}
            label={'Status Publikasi'}
            isRequired
            data={[
              { label: 'Publish', value: true },
              {
                label: 'Tidak Publish',
                value: false,
              },
            ]}
          />

          <RichText form={form} name={'isi'} label={'Isi Informasi'} isRow={false} required />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

export default FormMoreInformation

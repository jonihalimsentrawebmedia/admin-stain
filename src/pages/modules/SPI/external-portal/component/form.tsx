import type { Dispatch, SetStateAction } from 'react'
import type { TResolverExternalPortal } from '../data/resolver'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
  HandleSave: (e: TResolverExternalPortal) => void
  form: UseFormReturn<TResolverExternalPortal>
}

export const FormExternalPortal = (props: Props) => {
  const { open, setOpen, loading, HandleSave, form } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <UploadFileInput
            form={form}
            name={'url_gambar'}
            keyname={'key_url_gambar'}
            label={'Url Gambar'}
            accept={'.png, .jpg, .jpeg'}
            isRow
            required
          />
          <TextInput
            form={form}
            name={'url'}
            label={'URL'}
            placeholder={'URL Portal'}
            type={'url'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

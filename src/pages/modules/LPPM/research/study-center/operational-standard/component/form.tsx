import type { UseFormReturn } from 'react-hook-form'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import type { schemaStandardOperational } from '../data/resolver'

interface FormProps {
  form: UseFormReturn<schemaStandardOperational>
  handleSubmit: (data: schemaStandardOperational) => void
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const FormDocumentStandardOperational = (props: FormProps) => {
  const { form, handleSubmit, loading, open, setOpen } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInput
            form={form}
            label={'Nama Document'}
            placeholder={'Nama Document'}
            name={'nama_dokumen'}
            isRequired
            isRow
          />

          <InputRadio
            form={form}
            name={'jenis'}
            data={['URL', 'DOKUMEN'].map((row) => ({ label: row, value: row }))}
            label={'Jenis'}
            fx={() => {
              form.setValue('url', null)
              form.setValue('url_file', null)
            }}
            isRequired
            isRow
          />

          {form.watch('jenis') ? (
            form.watch('jenis') === 'URL' ? (
              <TextInput
                form={form}
                name={'url'}
                label={'URL'}
                placeholder={'URL'}
                isRequired
                isRow
              />
            ) : form.watch('jenis') === 'DOKUMEN' ? (
              <UploadFileInput
                form={form}
                name={'url_file'}
                keyname={'key_url_file'}
                label={'Upload File'}
                isRow
                required
                accept={'application/pdf'}
              />
            ) : null
          ) : null}

          <InputRadio
            form={form}
            name={'public'}
            data={[
              { label: 'Public', value: true },
              { label: 'Tidak', value: false },
            ]}
            label={'Public/Tidak'}
            isRequired
            isRow
          />

          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

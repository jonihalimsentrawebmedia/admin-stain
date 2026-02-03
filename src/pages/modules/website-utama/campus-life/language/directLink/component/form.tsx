import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  form: UseFormReturn<any>
  HandleSave: (e: any) => void
  loading: boolean
}

export const FormLanguageDirectURL = (props: Props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 p-5'}>
          <ButtonTitleGroup
            label={'Pengaturan Bahasa Tahun Akademik'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <RichText
            name={'teks_pengantar'}
            form={form}
            label={'Nama Tahun Akademik'}
            className={'bg-white'}
            required
            isRow
          />

          <TextInput
            name={'teks_tombol'}
            form={form}
            label={'Teks Tombol'}
            placeholder={'Teks Tombol'}
            inputClassName={'bg-white'}
            isRow
            isRequired
          />

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}

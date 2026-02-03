import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'

interface Props {
  form: UseFormReturn<any>
  HandleSave: (e: any) => void
  loading: boolean
}

export const FormLanguageCollaboration = (props: Props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 p-5'}>
          <ButtonTitleGroup
            label={'Pengaturan Bahasa Kerjasama'}
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

          <TextInput
            name={'nama_mitra'}
            form={form}
            label={'Nama Mitra Kerjasama'}
            placeholder={'Nama Mitra Kerjasama'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <TextAreaInput
            name={'detail_kerjasama'}
            form={form}
            label={'Detail Kerjasama'}
            placeholder={'Detail Kerjasama'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />
          
          <TextAreaInput
            name={'manfaat_untuk_mitra'}
            form={form}
            label={'Manfaat Untuk Mitra'}
            placeholder={'Manfaat Untuk Mitra'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />
          
          <TextAreaInput
            name={'manfaat_untuk_univ'}
            form={form}
            label={'Manfaat Untuk Universitas'}
            placeholder={'Manfaat Untuk Universitas'}
            inputClassName={'bg-white'}
            isRequired
            isRow
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

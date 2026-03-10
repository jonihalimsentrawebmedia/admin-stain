import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import FormUploadPhotoImage from '@/pages/modules/LPPM/components/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import { type ProfileData } from '../hooks/resolver'

interface FormProps {
  form: UseFormReturn<ProfileData>
  handleSubmit: (data: ProfileData) => void
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
  loading: boolean
  label?: string
}

export const FormGreetingLeader = (props: FormProps) => {
  const { form, handleSubmit, isEdit, setIsEdit, loading, label } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSubmit)}>
          <ButtonTitleGroup
            label={label ?? ''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  setIsEdit(!isEdit)
                },
              },
              {
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <div className="w-fit">
            <FormUploadPhotoImage form={form} name={'url_photo'} />
          </div>

          <TextInput
            name={'nama_lengkap'}
            form={form}
            label={'Nama Kepala Pusat Karir'}
            placeholder={'Nama Kepala Pusat Karir'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <RichText form={form} name={'isi'} isRow required label={'Deskripsi'} />

          <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
        </form>
      </Form>
    </>
  )
}

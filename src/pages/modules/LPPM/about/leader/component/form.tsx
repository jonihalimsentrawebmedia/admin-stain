import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { ProfileData } from '@/pages/modules/LPPM/about/leader/hooks/resolver.tsx'
import FormUploadPhotoImage from '@/pages/modules/LPPM/components/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

interface FormProps {
  form: UseFormReturn<ProfileData>
  handleSubmit: (data: ProfileData) => void
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
  loading: boolean
  label?: string
}

export const FormProfileInformation = (props: FormProps) => {
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
            <FormUploadPhotoImage form={form} name={'url_gambar'} />
          </div>

          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Ketua LPPM'}
            placeholder={'Nama Ketua LPPM'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <RichText form={form} name={'deskripsi'} isRow required label={'Deskripsi'} />

          <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
        </form>
      </Form>
    </>
  )
}

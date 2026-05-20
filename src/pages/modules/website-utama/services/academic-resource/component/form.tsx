import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { ResolverAcademicResourceType } from '../data/resolver'
import type { Dispatch, SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'

interface Props {
  form: UseFormReturn<ResolverAcademicResourceType>
  HandleSave: (e: ResolverAcademicResourceType) => void
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const FormAcademicResource = (props: Props) => {
  const { form, HandleSave, loading, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <UploadImageRatio
            placeholder={'icon'}
            name={'icon_url'}
            form={form}
            aspectRatioWidth={1}
            aspectRatioHeight={1}
            maxWidthClassName={'max-w-[180px]!'}
          />
          <TextInput
            form={form}
            name={'judul'}
            label={'Judul'}
            placeholder={'Judul'}
            htmlFor={'judul'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'url_layanan'}
            label={'URL Layanan'}
            placeholder={'URL Layanan'}
            htmlFor={'url_layanan'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            htmlFor={'urutan'}
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

export default FormAcademicResource

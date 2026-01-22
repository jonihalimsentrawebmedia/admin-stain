import type { Dispatch, SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { ICollectionResolver } from '@/pages/modules/website-unit/collection/listCollection/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import { RichText } from '@/components/common/richtext'

interface Props {
  form: UseFormReturn<ICollectionResolver>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: ICollectionResolver) => void
}

export const FormListCollection = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'nama_kategori'}
            form={form}
            label={'Kategori Koleksi'}
            placeholder={'Kategori Koleksi'}
            isDisabled
            isRow
          />

          <UploadImageRatio
            placeholder={'Foto/Logo'}
            name={'foto_url'}
            form={form}
            label={'Foto/Logo'}
            maxWidthClassName={'max-w-[240px]'}
            aspectRatioWidth={4}
            aspectRatioHeight={3}
            required
            isRow
          />

          <TextInput
            name={'nama_koleksi'}
            form={form}
            label={'Nama Koleksi'}
            placeholder={'Nama Koleksi'}
            isRequired
            isRow
          />

          <TextInput
            name={'url'}
            form={form}
            label={'URL'}
            placeholder={'URL Koleksi'}
            type={'url'}
            isRequired
            isRow
          />
          <RichText form={form} name={'uraian'} label={'Uraian'} isRow required />

          <TextInput
            form={form}
            name={'urutan'}
            type={'number'}
            label={'Urutan'}
            placeholder={'Urutan'}
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

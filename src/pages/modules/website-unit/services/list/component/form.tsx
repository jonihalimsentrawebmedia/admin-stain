import type { UseFormReturn } from 'react-hook-form'
import type { ListServiceResolverType } from '@/pages/modules/website-unit/services/list/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'

interface Props {
  form: UseFormReturn<ListServiceResolverType>
  loading: boolean
  open: boolean
  setOpen: (open: boolean) => void
  HandleSave: (e: ListServiceResolverType) => void
}

export const FormListService = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'nama_category'}
            label={'Nama Kategori Layanan'}
            placeholder={'Nama Kategori Layanan'}
            isDisabled
            isRow
          />

          <UploadImageRatio
            placeholder={'Foto/Logo'}
            maxWidthClassName={'max-w-[240px]'}
            aspectRatioWidth={4}
            aspectRatioHeight={3}
            name={'foto_url'}
            form={form}
            label={'Foto/Logo'}
            required
            isRow
          />

          <TextInput
            form={form}
            name={'nama_layanan'}
            label={'Nama Layanan'}
            placeholder={'Nama Layanan'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'link'}
            label={'Link / Pintasan'}
            placeholder={'Link / Pintasan'}
            type={'url'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'kontak'}
            label={'Kontak'}
            placeholder={'Kontak'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'uraian'}
            label={'Uraian'}
            placeholder={'Uraian'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'urutan'}
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

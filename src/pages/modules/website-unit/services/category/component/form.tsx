import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { CategoryServiceResolverType } from '@/pages/modules/website-unit/services/category/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface Props {
  form: UseFormReturn<CategoryServiceResolverType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: CategoryServiceResolverType) => void
}

export const FormCategoryService = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
          <TextInput
            form={form}
            name={'nama_unit'}
            label={'Pilih Unit'}
            className={'bg-white'}
            placeholder={'Pilih Unit'}
            isDisabled
            isRow
          />
          <TextInput
            form={form}
            name={'nama_layanan'}
            label={'Nama Kategori Layanan'}
            className={'bg-white'}
            placeholder={'Nama Kategori Layanan'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            className={'bg-white'}
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

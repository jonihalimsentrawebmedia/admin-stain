import type { UseFormReturn } from 'react-hook-form'
import type { ResolverFloorPlanType } from '@/pages/modules/website-unit/floor-plan/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'

interface Props {
  form: UseFormReturn<ResolverFloorPlanType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: ResolverFloorPlanType) => void
}

export const FormFloorPlan = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'nama_unit'}
            label={'Pilih Unit'}
            placeholder={'Nama Unit'}
            isDisabled
            isRow
          />

          <UploadImageRatio
            form={form}
            name={'denah_lantai_url'}
            label={'Denah Lantai'}
            maxWidthClassName={'max-w-[240px]'}
            aspectRatioWidth={4}
            aspectRatioHeight={3}
            required
            isRow
          />

          <TextInput
            name={'nama_lantai'}
            form={form}
            label={'Nama Lantai'}
            placeholder={'Cth: Lantai 1, Ground, Basement'}
            isRequired
            isRow
          />

          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            type={'number'}
            isRequired
            isNumber
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

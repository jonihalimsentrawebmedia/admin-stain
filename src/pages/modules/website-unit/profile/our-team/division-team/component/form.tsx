import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { DivisionTeamResolverType } from '../data/resolver'
import type { Dispatch, SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface Props {
  form: UseFormReturn<DivisionTeamResolverType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleSave: (e: DivisionTeamResolverType) => void
}

export const FormDivisionTeam = (props: Props) => {
  const { form, loading, open, setOpen, handleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(handleSave)}>
          <UploadImageRatio
            name={'foto_url'}
            form={form}
            aspectRatioHeight={4}
            aspectRatioWidth={3}
            maxWidthClassName={'max-w-[180px] w-full'}
            label={'Gambar'}
            placeholder={'Pilih gambar'}
            required
          />

          <TextInput name={'nama_unit'} isDisabled isRow label={'Pilih Unit'} form={form} />
          <TextInput name={'nama_divisi'} isDisabled isRow label={'Divisi'} form={form} />

          <TextInput
            name={'nama'}
            label={'Nama'}
            form={form}
            placeholder={'Nama'}
            isRequired
            isRow
          />

          <TextInput
            name={'jabatan'}
            label={'Jabatan'}
            form={form}
            placeholder={'Jabatan'}
            isRequired
            isRow
          />

          <InputRadio
            label={'Kepala Unit?'}
            form={form}
            name={'is_kepala_unit'}
            data={[
              { label: 'Ya', value: true },
              { label: 'Tidak', value: false },
            ]}
            isRow
            isRequired
          />

          <TextInput
            name={'urutan'}
            label={'Urutan'}
            form={form}
            type={'number'}
            placeholder={'Urutan'}
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

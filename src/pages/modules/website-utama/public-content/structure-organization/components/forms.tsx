import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { StructureOrganizationType } from '../data/resolver.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { OptionGrouping } from '@/pages/modules/constanta'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { Dispatch, SetStateAction } from 'react'

interface props {
  loading: boolean
  form: UseFormReturn<StructureOrganizationType>
  HandleSave: (e: StructureOrganizationType) => void
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export const FormStructureOrganization = (props: props) => {
  const { form, loading, HandleSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
          <SelectBasicInput
            name={'kelompok'}
            form={form}
            placeholder={'Pilih Kelompok'}
            data={OptionGrouping}
            label={'Kelompok'}
            usePortal
            isRequired
            isRow
          />
          <TextInput
            placeholder={'Nama Kelompok'}
            form={form}
            name={'nama_kelompok'}
            label={'Nama Kelompok'}
            isRequired
            isRow
          />
          <TextInput
            placeholder={'Urutan'}
            form={form}
            name={'urutan'}
            label={'Urutan'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />
          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  if (setOpen) {
                    setOpen(!open)
                  }
                },
              },
              { isDisabled: loading, label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />
        </form>
      </Form>
    </>
  )
}

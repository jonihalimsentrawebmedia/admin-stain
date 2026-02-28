import type { UseFormReturn } from 'react-hook-form'
import type { SchemaInformation } from '@/pages/modules/LPPM/PPID/information/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UseGetInformationTree } from '@/pages/modules/LPPM/PPID/information/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'

interface Props {
  form: UseFormReturn<SchemaInformation>
  loading: boolean
  HandleSave: (e: SchemaInformation) => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChild?: boolean
}

export const FormInformation = (props: Props) => {
  const { form, loading, HandleSave, open, setOpen } = props

  const { information } = UseGetInformationTree({
    page: '0',
    limit: '0',
  })

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          {props.isChild && (
            <SelectBasicInput
              name={'id_parent'}
              form={form}
              label={'Judul Informasi'}
              placeholder={'Judul Informasi'}
              data={
                information?.map((row) => ({
                  label: row?.judul,
                  value: row?.id_daftar_informasi,
                })) ?? []
              }
              isRow
              isDisabled
            />
          )}

          <TextInput
            form={form}
            name={'judul'}
            label={'Judul'}
            placeholder={'Judul'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'url'}
            label={'URL'}
            placeholder={'URL'}
            inputClassName={'bg-white'}
            type={'url'}
            isRow
          />

          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            type={'number'}
            isRow
            isNumber
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

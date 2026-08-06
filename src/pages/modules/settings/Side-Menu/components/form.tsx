import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TMenuForm } from '../data/resolver'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import { SwitchInput } from '@/components/common/form/switchInput'
import ButtonForm from '@/components/common/button/ButtonForm'
import type { ResReferensiType } from '@/interface/select'
import { ICON_OPTIONS } from '../data/icons'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TMenuForm>
  HandleSave: (e: TMenuForm) => void
  parentOptions: ResReferensiType[]
}

export const FormSideMenu = (props: Props) => {
  const { loading, open, setOpen, HandleSave, form, parentOptions } = props

  const parentData = [{ value: '', label: 'Tanpa Parent (Menu Utama)' }, ...parentOptions]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
        <SelectCustom
          data={parentData}
          name="parent_id"
          label="Parent Menu"
          placeholder="Pilih Parent"
          form={form}
          isRow
          level1
        />
        <InputText
          form={form}
          name="label"
          isRow
          label="Label"
          placeholder="Menu Baru"
          isRequired
        />
        <InputText form={form} name="link" isRow label="Link" placeholder="/menu-baru" />
        <SelectCustom
          data={ICON_OPTIONS}
          name="icon"
          label="Icon"
          placeholder="Pilih Icon"
          form={form}
          isRow
          level2
          formatOptionLabel={(option: ResReferensiType) => (
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">{option.icon}</span>
              <span>{option.label}</span>
            </div>
          )}
        />
        <TextInput
          inputClassName={'py-2.5! h-[40px]!'}
          isNumber
          form={form}
          type="number"
          name="urutan"
          isRow
          label="Urutan"
          placeholder="1"
          isRequired
        />
        <SwitchInput form={form} name="is_active" label="Aktif" isRow />
        <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
      </form>
    </Form>
  )
}

import type { UseFormReturn } from 'react-hook-form'
import type { ISettingMenuTypeForm } from '../model/resolver'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput'
import { InputRadio } from '@/components/common/form/InputRadio'
import ButtonForm from '@/components/common/button/ButtonForm'

interface Props {
  form: UseFormReturn<ISettingMenuTypeForm>
  handleSave: (e: ISettingMenuTypeForm) => void
  loading: boolean
  onCancel: () => void
}
const MenuForm = ({ handleSave, form, loading, onCancel }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <TextInput form={form} name="nama_menu" placeholder="Nama Menu" label="Nama Menu*" isRow />
        <TextInput
          form={form}
          name="controller"
          placeholder="Controller"
          label="Controller*"
          isRow
        />
        <InputRadio
          label="Halaman?"
          data={[
            {
              label: 'Ya',
              value: 'Y',
            },
            {
              label: 'Tidak',
              value: 'N',
            },
          ]}
          form={form}
          name="status"
          isRow
        />
        <TextInput
          form={form}
          name="sumber_data"
          placeholder="Sumber Data (url)*"
          label="Sumber Data (url)**"
          isRow
        />
        <TextInput
          form={form}
          name="urutan"
          placeholder="Urutan"
          label="Urutan*"
          isRow
          type="number"
          isNumber
        />
        <ButtonForm loading={loading} onCancel={onCancel} />
      </form>
    </Form>
  )
}

export default MenuForm

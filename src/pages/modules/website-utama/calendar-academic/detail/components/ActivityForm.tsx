import type { UseFormReturn } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'

import type { IActivityTypeForm } from '../../model/resolverActivity'

interface Props {
  form: UseFormReturn<IActivityTypeForm>
  handleSave: (value: IActivityTypeForm) => void
  handleCancel: () => void
  loading: boolean
}
const ActivityForm = ({ form, handleCancel, handleSave, loading }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-4">
          <TextInput
            form={form}
            name="nama_tahun_akademik"
            label="Nama Tahun Akademik"
            placeholder="Nama Tahun Akademik"
            isRow
            isDisabled
          />

          <TextInput
            form={form}
            name="nama_kegiatan"
            label="Nama Utama Kegiatan"
            placeholder="Nama Utama Kegiatan"
            isRow
          />
          <TextInput
            form={form}
            name="urutan"
            label="Urutan"
            placeholder="Urutan"
            isNumber
            type="number"
            isRow
          />
          <ButtonForm loading={loading} onCancel={handleCancel} />
        </div>
      </form>
    </Form>
  )
}

export default ActivityForm

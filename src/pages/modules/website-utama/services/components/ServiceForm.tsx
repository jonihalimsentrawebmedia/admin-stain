import type { UseFormReturn } from 'react-hook-form'
import type { IServicesTypeForm } from '../model/resolver'
import TextInput from '@/components/common/form/TextInput'
import { InputCheckbox } from '@/components/common/form/InputCheckbox'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'

interface Props {
  form: UseFormReturn<IServicesTypeForm>
  handleSave: (value: IServicesTypeForm) => void
  handleCancel: () => void
  loading: boolean
}
const ServiceForm = ({ form, handleCancel, handleSave, loading }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-4">
          <TextInput
            form={form}
            name="nama_layanan"
            label="Nama Layanan"
            placeholder="Nama Layanan"
            isRow
          />
          <TextInput
            isRow
            form={form}
            name="url_layanan"
            label="URL Layanan"
            placeholder="URL Layanan"
            type='url'
          />
          <InputCheckbox
            form={form}
            name="header"
            isRow
            isGrid
            data={[
              {
                label: 'Header',
                value: 'header',
              },
              {
                label: 'Bawah Slider',
                value: 'slider',
              },
              {
                label: 'Footer',
                value: 'footer',
              },
            ]}
            label="Posisi Aktif"
          />
          <ButtonForm loading={loading} onCancel={handleCancel} />
        </div>
      </form>
    </Form>
  )
}

export default ServiceForm

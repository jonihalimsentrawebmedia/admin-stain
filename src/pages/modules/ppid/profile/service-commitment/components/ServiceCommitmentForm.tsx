import type { UseFormReturn } from 'react-hook-form'
import ImageUpload from './ImageUpload'
import { RichText } from '@/components/common/richtext'
import { InputRadio } from '@/components/common/form/InputRadio'

interface Props {
  form: UseFormReturn<any>
}
const ServiceCommitmentForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <ImageUpload form={form} name="url_gambar" />
      <div className="flex gap-4 flex-col">
        <RichText form={form} name="deskripsi" label="Deskripsi" isRow={false} />
        <InputRadio
          data={[
            {
              label: 'Aktif',
              value: true,
            },
            {
              label: 'Tidak Aktif',
              value: false,
            },
          ]}
          form={form}
          name="public"
          isRow
          label="Staus Public*"
        />
      </div>
    </div>
  )
}

export default ServiceCommitmentForm

import { InputRadio } from '@/components/common/form/InputRadio'
import { InputText } from '@/components/common/form/InputText'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<any>
}
const DocumentSupportDetailForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <InputText form={form} name="judul" isDisabled isRow label="Judul*" placeholder="Judul" />
      <InputText
        form={form}
        name="nama_dokumen"
        isRow
        label="Nama Dokumen*"
        placeholder="Nama Dokumen"
      />
      <InputText form={form} name="url" isRow label="URL*" placeholder="URL" type="url" />
      <InputRadio
        data={[
          {
            label: 'Public',
            value: true,
          },
          {
            label: 'Tidak Public',
            value: false,
          },
        ]}
        label="Public / Tidak*"
        isRow
        name="public"
        form={form}
      />
      <InputText form={form} name="urutan" isRow label="Urutan*" placeholder="Urutan" />
    </div>
  )
}

export default DocumentSupportDetailForm
